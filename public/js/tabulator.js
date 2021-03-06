// Gets data about the user and execute function to build Order table
const getData = () => {
  $.get('/api/account').then((response) => {
    makeTable(response.results);
  });
};

// Update Tracking Number & Estimated Ship Date
const updateData = (data, id) => {
  $.ajax({
    method: 'PUT',
    url: '/api/account/' + id,
    data: {
      tracking_number: function () {
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            return data[i].tracking_number;
          }
        }
      },
      est_ship_date: function () {
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            return data[i].est_ship_date;
          }
        }
      }
    }
  }).then(() => {
    window.location.href = '/account';
  });
};

// Create new Orders, update database, and reload page
const addData = (data) => {
  let supplierInput = $('#supplier').val();
  let dueDateInput = $('#dueDate').val();
  let itemInput = $('#item').val();
  let poNumInput = $('#poNum').val();
  $.ajax({
    method: 'POST',
    url: '/api/orders',
    data: {
      supplier: supplierInput,
      dueDate: dueDateInput,
      item: itemInput,
      poNum: poNumInput,
      poReceived: false,
      supplierId: supplierInput,
      supplierMapId: supplierInput
    }
  }).then(() => {
    window.location.href = '/account';
  });
};

// Formats Update button
const saveButton = function (cell, formatterParams) {
  let btn = '<button class="button is-primary is-small">Update</button>';
  return btn;
};

// When Submit button is clicked on Order form, run function to add it to table
$('#poForm').on('submit', (event) => {
  event.preventDefault();
  addData();
});

// Function to edit Estimated Ship Date with date picker
var dateEditor = function (cell, onRendered, success, cancel, editorParams) {
  var editor = document.createElement('input');

  editor.setAttribute('type', 'date');
  editor.style.padding = '3px';
  editor.style.width = '100%';
  editor.style.boxSizing = 'border-box';
  editor.value = moment(cell.getValue(), 'MM/DD/YYYY').format('YYYY-MM-DD');

  onRendered(function () {
    editor.focus();
    editor.style.css = '100%';
  });

  function successFunc() {
    success(moment(editor.value, 'YYYY-MM-DD').format('MM/DD/YYYY'));
  }

  editor.addEventListener('change', successFunc);
  editor.addEventListener('blur', successFunc);

  return editor;
};

// Function to build Order table using Tabulator
const makeTable = (data) => {
  // If there is no data, return
  if (!data.length) {
    return;
  }

  new Tabulator('#po-table', {
    // Define table attributes
    data: data,
    layout: 'fitColumns',
    pagination: 'local',
    paginationSize: 5,
    columns: [
      // Define table columns
      {
        title: 'PO #',
        field: 'po_number',
        hozAlign: 'center'
      },
      {
        title: 'Item',
        field: 'item'
      },
      {
        title: 'Supplier',
        field: 'supplierName',
        hozAlign: 'center'
      },
      {
        title: 'Due Date',
        field: 'po_due_date',
        hozAlign: 'center',
        formatter: 'datetime',
        formatterParams: {
          outputFormat: 'MM/DD/YYYY'
        }
      },
      {
        title: 'Est. Ship Date',
        field: 'est_ship_date',
        hozAlign: 'center',
        editor: dateEditor
      },
      {
        title: 'Tracking #',
        field: 'tracking_number',
        hozAlign: 'center',
        editor: 'textarea',
        editorParams: {
          elementAttributes: {
            maxlength: '100'
          }
        }
      },
      {
        hozAlign: 'center',
        formatter: saveButton,
        cellClick: function (e, cell) {
          // Executes function to update Order table on click
          var row = cell.getRow();
          var id = row.getIndex();
          updateData(data, id);
        }
      }
    ]
  });
};

getData();
