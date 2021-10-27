package com.acuity.visualisations.rawdatamodel.dataproviders.config;

import com.acuity.visualisations.rawdatamodel.dataproviders.common.kryo.KryoContext;
import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.pool.KryoPool;
import de.javakaffee.kryoserializers.ArraysAsListSerializer;
import de.javakaffee.kryoserializers.CollectionsEmptyListSerializer;
import de.javakaffee.kryoserializers.CollectionsEmptyMapSerializer;
import de.javakaffee.kryoserializers.CollectionsEmptySetSerializer;
import de.javakaffee.kryoserializers.CollectionsSingletonListSerializer;
import de.javakaffee.kryoserializers.CollectionsSingletonMapSerializer;
import de.javakaffee.kryoserializers.CollectionsSingletonSetSerializer;
import de.javakaffee.kryoserializers.SynchronizedCollectionsSerializer;
import de.javakaffee.kryoserializers.UnmodifiableCollectionsSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class DataProviderConfiguration {

    private Kryo factory() {
        Kryo kryo = new Kryo();
        kryo.setReferences(true);
        kryo.setRegistrationRequired(false);
        registerCustomSerializers(kryo);
        return kryo;
    }

    // the Arrays.asList method is deliberately used here without arguments to receive Arrays.ArrayList class object from it
    @SuppressWarnings("ArraysAsListWithZeroOrOneArgument")
    private void registerCustomSerializers(Kryo kryo) {
        kryo.register(Arrays.asList().getClass(), new ArraysAsListSerializer());
        kryo.register(Collections.emptyList().getClass(), new CollectionsEmptyListSerializer());
        kryo.register(Collections.emptyMap().getClass(), new CollectionsEmptyMapSerializer());
        kryo.register(Collections.emptySet().getClass(), new CollectionsEmptySetSerializer());
        kryo.register(Collections.singletonList("").getClass(), new CollectionsSingletonListSerializer());
        kryo.register(Collections.singleton("").getClass(), new CollectionsSingletonSetSerializer());
        kryo.register(Collections.singletonMap("", "").getClass(), new CollectionsSingletonMapSerializer());
        UnmodifiableCollectionsSerializer.registerSerializers(kryo);
        SynchronizedCollectionsSerializer.registerSerializers(kryo);
    }

    // Build pool with SoftReferences enabled (optional)
    @Bean
    public KryoPool kryoPool() {
        return new KryoPool.Builder(this::factory).softReferences().build();
    }

    @Bean
    public KryoContext kryoContext() {
        return new KryoContext(kryoPool());
    }
}
