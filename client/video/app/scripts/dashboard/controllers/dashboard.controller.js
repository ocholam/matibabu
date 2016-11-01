/**
 * Copyright 2015 Longtail Ad Solutions Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 **/

(function () {

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /**
     * @ngdoc controller
     * @name app.dashboard.controller:DashboardController
     *
     * @requires ui.router.state.$state
     * @requires app.core.dataStore
     */
    DashboardController.$inject = ['$state', 'dataStore'];
    function DashboardController ($state, dataStore) {

        var vm = this;

        vm.dataStore          = dataStore;
        vm.cardClickHandler   = cardClickHandler;

        ////////////

        /**
         * Handle click event on cards
         *
         * @param {app.core.item}   item        Clicked item
         * @param {boolean}         autoStart   Should the video playback start automatically
         */
        function cardClickHandler (item, autoStart) {

            $state.go('root.video', {
                feedId:    item.feedid,
                mediaId:   item.mediaid,
                autoStart: autoStart
            });
        }
    }

}());