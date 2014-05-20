exports.ToDoPage = function () {
    this.saveButton = element(by.css('[type="submit"]'));
    this.titleField = element(by.model("formData.title"));
    this.descriptionField = element(by.model("formData.description"));
    this.get = function () {
        browser.get("#!/add");
    };
};

exports.ToDoListPage = function () {
    this.addButton = element(by.css('[href="#!/add"]'));
    this.firstToDoTitle = element(by.repeater("todo in todos").row(0).column("title"));
    this.firstToDoDescription = element(by.repeater("todo in todos").row(0).column("description"));
    this.firstToDoDeleteButton = element(by.css('table tr:first-child td:last-child button'));
    this.toDoList = element.all(by.repeater("todo in todos"));
    this.get = function () {
        browser.get("#!/");
    };
};