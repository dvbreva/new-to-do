(function () {
    var itemsList = document.getElementById('items-list');
    var item = document.getElementById('item');
    var date = document.getElementById('date');
    var form = document.getElementById("todo-form");
    var template = Handlebars.compile(document.getElementById('template').innerHTML);
    var todos = [];

    function addItem() {
        todos.push({
            id: Date.now(),
            item: item.value,
            date: date.value,
            isComplete: false
        });

        item.value = '';
        date.value = '';

        storeTodos();
        render();
    }

    function removeItem(itemId) {
        var index = todos.findIndex(item => item.id === +itemId);
        todos.splice(index, 1);

        storeTodos();
        render();
    }

    function toggleItem(itemId) {
        var todo = todos.find(item => item.id === +itemId);
        todo.isComplete = !todo.isComplete;

        storeTodos();
        render();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        var title = item.value;
        var selectedDate = date.value;
        var isValid = true;

        for (i = 0; i < todos.length; i++) {
            if (todos[i].item == title && todos[i].date == selectedDate) {
                isValid = false;
            }
        }

        if (!isValid) {
            alert("You cannot add two identical items for the same date sorry.");
        }

        if (isValid && title != '' && selectedDate != '') {
            addItem();
        }
    });

    itemsList.addEventListener('click', function (e) {
        var element = e.target;

        if (element.classList.contains('btn-toggle')) {
            toggleItem(element.getAttribute('data-id'));
        } else if (element.classList.contains('btn-remove')) {
            removeItem(element.getAttribute('data-id'));
        }
    }, false);

    function render() {
        var rendered = template({ todos: todos })
        itemsList.innerHTML = rendered;

        /* var html = '';

        for (var i in todos) {
            var todo = todos[i];

            html += `
                <tr>
                    <td ${todo.isComplete ? 'class="completed"' : ''}>${todo.item}</td>
                    <td ${todo.isComplete ? 'class="completed"' : ''}>${todo.date}</td>
                    <td>
                        <button type="button" class="btn btn-success btn-toggle complete-button" data-id="${todo.id}">
                            ${todo.isComplete ? 'Undo' : 'Complete'}
                        </button>
                        <button type="button" class="btn btn-danger btn-remove remove-button" data-id="${todo.id}">Remove</button>
                    </td>
                </tr>`;
        }
        itemsList.innerHTML = html;
       */
    }

    function storeTodos() {
        window.localStorage.todos = JSON.stringify(todos);
    }

    function loadTodos() {
        if (window.localStorage.todos) {
            todos = JSON.parse(window.localStorage.todos);
        }
        render();
    }

    loadTodos();
})();