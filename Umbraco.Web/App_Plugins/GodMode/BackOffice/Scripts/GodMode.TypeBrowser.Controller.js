﻿'use strict'
angular.module("umbraco").controller("GodMode.TypeBrowser.Controller",
    function ($scope, $routeParams, godModeResources, godModeConfig) {

        $scope.isLoading = true;
        $scope.config = godModeConfig.config;
        $scope.search = {};
        $scope.sort = {};
        $scope.sort.column = "Name";
        $scope.sort.reverse = false;

        godModeResources.getAssemblies().then(function (data) {
            $scope.assemblies = data;
            $scope.isLoading = false;
        });

        godModeResources.getTypesToBrowse().then(function (data) {
            $scope.typesList = data;
            $scope.isLoading = false;
        });

        $scope.getTypes = function (type) {

            $scope.types = [];
            if (!type) return;

            $scope.isLoading = true;
            godModeResources.getTypesAssignableFrom(type.LoadableName).then(function (data) {
                $scope.types = data;
                $scope.isLoading = false;
            });
        }

        $scope.getInterfaces = function (assembly) {

            $scope.interfaces = [];
            $scope.types = [];

            if (!assembly) return;

            $scope.isLoading = true;

            godModeResources.getInterfacesFrom(assembly.Value).then(function (data) {
                $scope.interfaces = data;
                $scope.isLoading = false;

            });
        }

        $scope.sortBy = function (column) {
            $scope.sort.column = column;
            $scope.sort.reverse = !$scope.sort.reverse;
        }

    });