// require sql

const getData = () => {
  $.get("/api/members").then((response) => {
    console.log(response);
    makeTable(response.results);
  });
};

const makeTable = (data) => {
  new Tabulator("#po-table", {
    // height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: data, // assign data to table
    layout: "fitColumns", // fit columns to width of table (optional)
    columns: [
      // Define Table Columns
      { title: "Item", field: "item", width: 150 },
      {
        title: "Supplier Number",
        field: "supplier_number",
        hozAlign: "left",
      },

      {
        title: "Po Number",
        field: "po_number",
        hozAlign: "center",
      },
      {
        title: "Po Due Date",
        field: "po_due_date",
        hozAlign: "center",
      },
      {
        title: "Estimated Ship Date",
        field: "est_ship_date",
        hozAlign: "center",
      },
      {
        title: "Tracking Number",
        field: "tracking_number",
        hozAlign: "center",
        editor: "textarea",
        editorParams: {
          elementAttributes: {
            maxlength: "100", //set the maximum character length of the textarea element to 10 characters
          },
        },
      },
    ],
  });
};

getData();
