function writeData() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var today = Utilities.formatDate(new Date(), "JST","yyyy/MM/dd")
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1).setValue(today);
  getTwitterFollowers(row, 2);
}

function getTwitterFollowers(row, col) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("シート1");

  var url = sheet.getRange(1, col).getValue();
  var postheader = {
    "timeout":"50000"
  }
  var parameters = {
    "method":"get",
    "muteHttpExceptions": true,
    "headers": postheader
  }
  var html = UrlFetchApp.fetch(url, parameters).getContentText('UTF-8');
  Logger.log(html);  
  var searchTag = 'followers';
  var index = html.indexOf(searchTag)
  if (index !== -1) {
    html = html.substring(index + searchTag.length);
    //searchTag = '<div class="statnum">';
    //searchTag = 'data-count=';
    searchTag = 'title="';
    index = html.indexOf(searchTag);
    if (index !== -1) {
      html = html.substring(index + searchTag.length);
      //index = html.indexOf('</div>');
      //index = html.indexOf(' ');
      index = html.indexOf(' Followers"');
      if (index !== -1) {
        sheet.getRange(row, col).setValue(html.substring(0, index));
      }
    }
  }
}