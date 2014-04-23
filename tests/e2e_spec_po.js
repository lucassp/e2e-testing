var PageObjects = require("./PageObjects.js");

describe('Add a new todo', function() {

    var ToDoPage, ToDoListPage;

    beforeEach(function () {
        ToDoListPage = new PageObjects.ToDoListPage();
        ToDoPage = new PageObjects.ToDoPage();
        ToDoListPage.get();
    });

    it('should have the save button disabled', function() {

        ToDoListPage.addButton.click();

        expect(ToDoPage.saveButton.isEnabled()).toEqual(false);
    });

    it('should have the save button enabled after filling in the fields', function() {

        ToDoListPage.addButton.click();

        ToDoPage.titleField.sendKeys("Create E2E spec");
        ToDoPage.descriptionField.sendKeys("for the entire app");

        expect(ToDoPage.saveButton.isEnabled()).toEqual(true);
    });

    it('should save new todo', function() {

        ToDoListPage.addButton.click();

        ToDoPage.titleField.sendKeys("Create E2E spec");
        ToDoPage.descriptionField.sendKeys("for the entire app");

        ToDoPage.saveButton.click();

        expect(ToDoListPage.firstToDoTitle.getText()).toEqual("Create E2E spec");
        expect(ToDoListPage.firstToDoDescription.getText()).toEqual("for the entire app");
    });

});

describe('Edit the saved todo', function() {

    var ToDoPage, ToDoListPage;

    beforeEach(function () {
        ToDoListPage = new PageObjects.ToDoListPage();
        ToDoPage = new PageObjects.ToDoPage();
        ToDoListPage.get();
    });

    it('should open the saved todo', function() {

        ToDoListPage.firstToDoTitle.click();

        expect(ToDoPage.titleField.getAttribute("value")).toEqual("Create E2E spec");
        expect(ToDoPage.descriptionField.getAttribute("value")).toEqual("for the entire app");
    });

    it('should edit the saved todo', function() {

        ToDoListPage.firstToDoTitle.click();

        ToDoPage.titleField.clear();
        ToDoPage.titleField.sendKeys("Create Protractor E2E spec");

        ToDoPage.descriptionField.clear();
        ToDoPage.descriptionField.sendKeys("for the entire app really easy");

        ToDoPage.saveButton.click();

        expect(ToDoListPage.firstToDoTitle.getText()).toEqual("Create Protractor E2E spec");
        expect(ToDoListPage.firstToDoDescription.getText()).toEqual("for the entire app really easy");
    });
});

describe('Delete the saved todo', function() {
    it('should delete the todo', function () {

        var ToDoListPage = new PageObjects.ToDoListPage();

        ToDoListPage.get();

        ToDoListPage.firstToDoDeleteButton.click();

        ToDoListPage.toDoList.then(function (arr) {
            expect(arr.length).toEqual(0);
        });
    });
});