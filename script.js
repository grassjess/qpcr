let currentPage = 1;
const sampleData = [];

function goToPage(page) {
  document.querySelector(`#page${currentPage}`).classList.remove('active');
  document.querySelector(`#page${page}`).classList.add('active');
  currentPage = page;
  if (page === 2) renderPlate96();
  if (page === 3) renderPlate384();
}

function renderPlate96() {
  const plate = document.getElementById('plate96');
  plate.innerHTML = '';
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  for (let r = 0; r < 8; r++) {
    for (let c = 1; c <= 12; c++) {
      const well = document.createElement('div');
      well.className = 'well';
      well.dataset.position = `${rows[r]}${c}`;
      well.contentEditable = true;
      if (r === 0 && c === 1) {
        well.textContent = 'Standard 0';
        well.classList.add('standard');
        well.contentEditable = false;
      }
      plate.appendChild(well);
    }
  }
}

function renderPlate384() {
  const plate = document.getElementById('plate384');
  plate.innerHTML = '';
  const rows = [...Array(16)].map((_, i) => String.fromCharCode(65 + i));
  for (let r = 0; r < 16; r++) {
    for (let c = 1; c <= 24; c++) {
      const well = document.createElement('div');
      well.className = 'well';
      well.dataset.position = `${rows[r]}${c}`;
      plate.appendChild(well);
    }
  }
}

function autoPopulate() {
  const plate = document.getElementById('plate384');
  const wells = plate.querySelectorAll('.well');
  // Example logic: assign samples to every other row and column
  let sampleIndex = 0;
  for (let i = 0; i < wells.length; i++) {
    const rowChar = wells[i].dataset.position.charAt(0);
    const rowIndex = rowChar.charCodeAt(0) - 65;
    const colIndex = parseInt(wells[i].dataset.position.slice(1)) - 1;
    if (rowIndex % 2 === 1 && colIndex % 2 === 0) {
      wells[i].classList.add('sample');
      wells[i].textContent = `S${sampleIndex + 1}`;
      sampleIndex++;
    }
  }
}

function exportCSV() {
  const plate = document.getElementById('plate384');
  const wells = plate.querySelectorAll('.well');
  let csvContent = 'data:text/csv;charset=utf-8,Well,Content\n';
  wells.forEach(well => {
    const content = well.textContent || '';
    csvContent += `${well.dataset.position},${content}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'plate_map.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
