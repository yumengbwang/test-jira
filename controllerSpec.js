describe('Controller: ListCtrl', function() {
    // Instantiate a new version of my module before each test
    beforeEach(module('notesApp'));

    var ctrl, testService;

    // Before each unit test, instantiate a new instance
    // of the controller
    beforeEach(inject(function($controller, helloWorld) {
        testService = helloWorld;
        ctrl = $controller('ListCtrl');
    }));

    it('should have items available on load', function() {
        expect(ctrl.serviceData).toEqual("Hello, World!");
        expect(ctrl.items).toEqual([
            {id: 1, label: 'First', done: true},
            {id: 2, label: 'Second', done: false}
        ]);
    });
    it('get service data', function() {
        var data = testService.getdata()
        expect(data).toEqual("data");
    });

    it('should have highlight items based on state', function() {
        var item = {id: 1, label: 'First', done: true};

        var actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeTruthy();
        expect(actualClass.unfinished).toBeFalsy();

        item.done = false;
        actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeFalsy();
        expect(actualClass.unfinished).toBeTruthy();
    });

});

describe('Controller: ModalDemoCtrl', function() {
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('notesApp'));

    var MainCtrl,modalInstance;

// Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $modal) {
        modalInstance = {
            close: function( item ) {
                //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                this.result.confirmCallBack( item );
            },
            dismiss: function( type ) {
                //The user clicked cancel on the modal dialog, call the stored cancel callback
                this.result.cancelCallback( type );
            },
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            }
        };
        spyOn($modal, 'open').and.returnValue(modalInstance);
        MainCtrl = $controller('ModalDemoCtrl',{$modal: $modal});
    }));

    it('should open modal window and returns success response', function () {
        expect(MainCtrl.items).toEqual(['item1', 'item2', 'item3']);
        MainCtrl.open(); // Open the modal
        modalInstance.close('item1');
        expect(MainCtrl.selected).toEqual('item1');
    });

});

describe('Controller: ModalInstanceCtrl', function() {
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('notesApp'));

    var MainCtrl,modalInstance, items= ['item1', 'item2', 'item3'];

// Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            }
        };
        MainCtrl = $controller('ModalInstanceCtrl',{$modalInstance: modalInstance, items: items});
    }));

    it('should get data from modal controller', function () {
        expect(MainCtrl.items).toEqual(['item1', 'item2', 'item3']);
        expect(MainCtrl.selected.item).toEqual('item1');
    });

    it('should return "OK" response', function () {
        MainCtrl.ok();
        expect(modalInstance.close).toHaveBeenCalledWith('item1');
    });

    it('should return "cancel" response', function () {
        MainCtrl.cancel();
        expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

});

