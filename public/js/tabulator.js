const getData = () => {
  $.get('/api/account').then((response) => {
    // console.log(response.results);
    makeTable(response.results);
    //console.log(data);
  });
};

// Update tracking number ajax call
const updateData = (data, id) => {
  console.log(data);
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

// Add orders ajax call
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

const saveButton = function (cell, formatterParams) {
  let btn = ' <button class="button is-primary is-small">Update</button>';
  return btn;
};

$('#poForm').on('submit', (event) => {
  event.preventDefault();
  addData();
});

// Date editor function
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

const makeTable = (data) => {
  new Tabulator('#po-table', {
    // Define Table Columns
    // Pagination: 'local',
    data: data,
    layout: 'fitColumns',
    pagination: 'local',
    paginationSize: 5,
    columns: [
      // Define Table Columns
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
        field: 'supplier.supplier_name',
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
          // Function to route api here
          var row = cell.getRow();
          var id = row.getIndex();
          updateData(data, id);
          console.log(id);
        }
      }
    ]
  });
};

getData();
