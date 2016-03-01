(function() {
  'use strict';

  angular
    .module('test')
    .controller('MainController', MainController);

  /** @ngInject */
  MainController.$inject = ['$scope', 'toastr'];
  function MainController($scope, toastr) {
    var vm = this;
    var canvas = angular.element('#canvas')[0];
    var context = canvas.getContext('2d');
    var a = angular.element('#a-wrap');
    var b = angular.element('#b-wrap');

    vm._a = Math.floor(Math.random() * 4 + 6);
    vm.a = '';
    vm._b = Math.floor(Math.random() * 4 + (11 - vm._a));
    vm.b = '';
    vm.c = '';

    vm.x1 = 0.5;
    vm.y1 = 149.5;
    vm.step = 15;

    $scope.$watch('vm.a', function(){
      if (vm.a == vm._a){
        //a.css({ 'border' : 'none', 'outline' : 'none' });
        //a.prop('readonly', 1);
      }
      draw();
    })

    $scope.$watch('vm.c', function(){
      if (vm.c && vm.c == vm.a + vm.b){
        toastr.success('Правильно!');
      }
    });

    function draw(){
      context.clearRect(0,0,780,350);

      // draw first arrow
      if (vm._a){

        var x2 = vm._a * vm.step;
        var y2 = x2 / 3;

        a.css({
          left: vm._a * 39 / 2 + 5
        });

        drawArrow(vm.x1, vm.y1, x2 /2, vm.y1 - y2, x2, vm.y1);


        // draw second arrow
        if (vm._a == vm.a){
          var x3 = vm._b * vm.step;
          var y3 = x3 / 3;

          b.css({
            left: vm._a * 39 + vm._b * 39 / 2 + 5 
          });

          drawArrow(x2, vm.y1, x2 + x3 / 2, vm.y1 - y3, x2 + x3);
        }


      }


    }

    function drawArrow(x1, y1, x2, y2, x3) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.quadraticCurveTo(x2, y2, x3, y1);
      context.strokeStyle = 'red';
      context.lineWidth = 1;
      context.stroke();

      drawCap(x3, y1);
    }

    function drawCap(x1, y1){
      context.beginPath();
      context.moveTo(x1, y1);

      context.lineTo(x1 - 3, y1 - 4);
      context.moveTo(x1, y1);
      context.lineTo(x1 - 5, y1 - 1);

      context.lineWidth = 1;
      context.stroke();
      context.stroke();
    }


  }
})();
