angular.module('notesApp', [])
.factory('helloWorld', function() {
    return {
        sayHello: function() {
            return "Hello, World!"
        },
        getdata: function() {
            return "data"
        }
    };
}) .controller('ListCtrl', ['helloWorld', function(helloWorld) {

        var self = this;
        self.serviceData = helloWorld.sayHello();
        self.items = [
            {id: 1, label: 'First', done: true},
            {id: 2, label: 'Second', done: false}
        ];

        self.getDoneClass = function(item) {
            return {
                finished: item.done,
                unfinished: !item.done
            };
        };
    }]
)
    .controller('ModalDemoCtrl', function ($modal, $log) {
        var self= this;
        self.items = ['item1', 'item2', 'item3'];

        self.open = function () {

            self.modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function () {
                        return self.items;
                    }
                }
            });

            self.modalInstance.result.then(function (selectedItem) {
                self.selected = selectedItem;
            });
        };
    })
    .controller('ModalInstanceCtrl', function ($modalInstance, items) {
        var self = this;
        self.items = items;
        self.selected = {
            item: self.items[0]
        };

        self.ok = function () {
            $modalInstance.close(self.selected.item);
        };

        self.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
