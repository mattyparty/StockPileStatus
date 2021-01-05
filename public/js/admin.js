const getAdminData = () => {
  $.get('/api/admin').then((response) => {
    console.log(response.results);
    makeAdminTable(response.results);
    //console.log(data);
  });
};

const makeAdminTable = (data) => {
  new Tabulator('#admin-table', {
    // Define Table Columns
    // pagination: 'local',
    data: data,
    layout: 'fitColumns',
    pagination: 'local',
    paginationSize: 5,
    columns: [
      // Define Table Columns
      {
        title: 'User Email',
        field: 'login_email',
        hozAlign: 'left'
      },
      {
        title: 'Supplier ID',
        field: 'supplierId',
        hozAlign: 'center'
      },

      {
        hozAlign: 'center',
        formatter: saveButton,
        cellClick: function(e, cell) {
          // funtion to route api here
          var row = cell.getRow();
          var id = row.getIndex();
          updateData(data, id);
          console.log(id);
        }
      }
    ]
  });
};

getAdminData();
