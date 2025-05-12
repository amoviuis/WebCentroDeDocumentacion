function filterTable() {
  function diacriticSensitiveRegex(string = "") {
    return string
      .replace(/a/g, "[aáàäâ]")
      .replace(/A/g, "[AÁÀÄÂ]")
      .replace(/e/g, "[eéëè]")
      .replace(/E/g, "[EÉËÈ]")
      .replace(/i/g, "[iíïì]")
      .replace(/I/g, "[IÍÏÌ]")
      .replace(/o/g, "[oóöò]")
      .replace(/O/g, "[OÓÖÒ]")
      .replace(/u/g, "[uüúù]")
      .replace(/U/g, "[UÜÚÙ]");
  }
  var input,
    filter,
    table,
    tr,
    tdTitle,
    tdSubTitle,
    tdAuthor,
    tdProducAcade,
    tdYear,
    i,
    txtValueTitle,
    txtValueAuthor,
    txtValueSubTitle,
    txtProducAcade,
    txtValueYear;
  input = document.getElementById("search");
  filter = diacriticSensitiveRegex(input.value.toUpperCase());
  table = document.getElementById("recordTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    tdTitle = tr[i].getElementsByTagName("td")[1];
    tdSubTitle = tr[i].getElementsByTagName("td")[2];
    tdAuthor = tr[i].getElementsByTagName("td")[3];
    tdProducAcade = tr[i].getElementsByTagName("td")[0];
    tdYear = tr[i].getElementsByTagName("td")[4];

    if (tdTitle || tdSubTitle || tdAuthor || tdProducAcade || tdYear) {
      txtValueTitle = tdTitle.textContent || tdTitle.innerText;
      txtValueSubTitle = tdSubTitle.textContent || tdSubTitle.innerText;
      txtValueAuthor = tdAuthor.textContent || tdAuthor.innerText;
      txtProducAcade = tdProducAcade.textContent || tdProducAcade.innerText;
      txtValueYear = tdYear.textContent || tdYear.innerText;

      if (
        txtValueTitle.toUpperCase().match(filter) ||
        txtValueAuthor.toUpperCase().match(filter) ||
        txtProducAcade.toUpperCase().match(filter) ||
        txtValueYear.toUpperCase().match(filter) ||
        txtValueSubTitle.toUpperCase().match(filter)
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
