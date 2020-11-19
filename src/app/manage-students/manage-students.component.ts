import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import html2pdf from 'html2pdf';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  constructor() { }

  fonts = {
    Amiri:{
      normal: "Amiri-Regular.ttf",
    }
  };
  ngOnInit(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var text = "سلام";
    var docDefinition = {
      content: text ,
      defaultStyle: {
      font: 'Amiri'
    }
  };
  var externalDataRetrievedFromServer = [
    { الاسم: 'sssssssssssssssssssssssssssssssssssssssssssssssssss', السن: 34 },
    { الاسم: 'John', السن: 27 },
    { الاسم: 'Elizabeth', السن: 30 },
];

function buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push({text: row[column].toString() , alignment: 'center'});
        })

        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
    return {
        table: {
            widths: ['*' , '*'],
            headerRows: 1,
            body: buildTableBody(data, columns),
            alignment: 'center',
        }
    };
}

var dd = {
    content: [
        { text: 'Dynamic parts', style: 'header'},
        table(externalDataRetrievedFromServer, ['الاسم', 'السن'])
    ],
    defaultStyle: {
      font: 'Amiri'
    }

  }

  pdfMake.createPdf(dd , null , this.fonts).download();

  }

}
