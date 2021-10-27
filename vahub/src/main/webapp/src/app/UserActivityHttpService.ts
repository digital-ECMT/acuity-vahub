/*
 * Copyright 2021 The University of Manchester
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {getServerPath} from './common/utils/Utils';

@Injectable()
export class UserActivityHttpService {
    constructor(private http: HttpClient) {
    }

    sendUserActivity(data: any): Observable<any> {
        const path = getServerPath('logging', 'viewchange');

        return this.http.post(path, JSON.stringify(data));
    }
}

