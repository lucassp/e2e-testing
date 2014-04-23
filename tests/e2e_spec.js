describe('Add a new todo', function() {

    beforeEach(function () {
        browser.get('#!/add');
    });

    it('should have the save button disabled', function() {
        var saveButton = element(by.css('[type="submit"]'));

        expect(saveButton.isEnabled()).toEqual(false);
    });

    it('should have the save button enabled after filling in the fields', function() {
        var saveButton;

        element(by.model("formData.title")).sendKeys("Create E2E spec");
        element(by.model("formData.description")).sendKeys("for the entire app");

        saveButton = element(by.css('[type="submit"]'));

        expect(saveButton.isEnabled()).toEqual(true);
    });

    it('should save new todo', function() {
        var saveButton;

        element(by.model("formData.title")).sendKeys("Create E2E spec");
        element(by.model("formData.description")).sendKeys("for the entire app");

        saveButton = element(by.css('[type="submit"]'));

        saveButton.click();

        expect(element(by.repeater("todo in todos").row(0).column('title')).getText()).toEqual("Create E2E spec");
        expect(element(by.repeater("todo in todos").row(0).column('description')).getText()).toEqual("for the entire app");
    });

});

describe('Edit the saved todo', function() {

    beforeEach(function () {
        browser.get("#!/");
    });

    it('should open the saved todo', function() {

        element(by.repeater("todo in todos").row(0).column("title")).click();

        expect(element(by.model("formData.title")).getAttribute("value")).toEqual("Create E2E spec");
        expect(element(by.model("formData.description")).getAttribute("value")).toEqual("for the entire app");
    });

    it('should edit the saved todo', function() {
        var saveButton;

        saveButton = element(by.css('[type="submit"]'));

        element(by.repeater("todo in todos").row(0).column("title")).click();

        element(by.model("formData.title")).clear();
        element(by.model("formData.title")).sendKeys("Create Protractor E2E spec");

        element(by.model("formData.description")).clear();
        element(by.model("formData.description")).sendKeys("for the entire app really easy");

        saveButton.click();

        expect(element(by.repeater("todo in todos").row(0).column('title')).getText()).toEqual("Create Protractor E2E spec");
        expect(element(by.repeater("todo in todos").row(0).column('description')).getText()).toEqual("for the entire app really easy");
    });
});

describe('Delete the saved todo', function() {
    it('should delete the todo', function () {

        browser.get("#!/");

        element(by.css('table tr:first-child td:last-child button')).click();

        element.all(by.repeater("todo in todos")).then(function (arr) {
            expect(arr.length).toEqual(0);
        });
    });
});