// Properties list
var options    = [
  {
    label: "Choose property",
    val: 0
  },
	{
    label: "origin name",
    val: "origin_name"
  },
  {
    label: "origin address",
    val: "origin_address"
  },
  {
  label: "weight",
  val: "weight"
	},
  {
  label: "boxes width",
  val: "boxes_width"
	},
  {
  label: "boxes length",
  val: "boxes_length"
	},
  {
  label: "boxes height",
  val: "boxes_height"
	},
  {
  label: "boxes quantity",
  val: "boxes_quantity"
	},
  {
  label: "pallets width",
  val: "pallets_width"
	},
  {
  label: "pallets length",
  val: "pallets_length"
	},
  {
  label: "pallets height",
  val: "pallets_height"
	},
  {
  label: "pallets quantity",
  val: "pallets_quantity"
	},
  {
  label: "shipper",
  val: "shipper"
	},
  {
  label: "notes",
  val: "notes"
	},
  {
  label: "destination name",
  val: "destination_name"
	},
  {
  label: "destination address",
  val: "destination_address"
	},
  {
  label: "destination address",
  val: "destination_address"
	},
  {
  label: "accessorials type",
  val: "accessorials_type"
	},
  {
  label: "accessorials documents id",
  val: "accessorials_documents_id"
	},
  {
  label: "accessorials documents type",
  val: "accessorials_documents_type"
	}
];

// Selectors
var $thead      = document.querySelector("#outputCSV thead");
var $tbody      = document.querySelector("#outputCSV tbody");
var $inputCSV   = document.getElementById("inputCSV");
var $actionBtn  = document.getElementById("actionBtn");
var $outputData = document.getElementById("outputData");

// Events
$inputCSV.addEventListener('change', fileHandler, false);

// Methods
function fileHandler() {
  $tbody.innerHTML = '';
  $thead.innerHTML = '';
  $outputData.classList.add('hidden');
  if (typeof (FileReader) != "undefined") {
    var totalCols = 0;
    var reader = new FileReader();
    reader.onload = function (e) {
        rows = e.target.result.split("\n");
        rows.shift();
        for (var i = 0; i < rows.filter(Boolean).length; i++) {
            var row = $tbody.insertRow(-1);
            var cells = rows[i].split(",");
            totalCols = cells.length;
            for (var j = 0; j < cells.filter(Boolean).length; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = cells[j];
            }
        }
        var theadRow = $thead.insertRow(0);
        for (var tr = 0; tr < totalCols; tr++) {
            var theadCell = theadRow.insertCell(0);
            generateSelect(theadCell);
        }
        $actionBtn.disabled = false;
    }
    reader.readAsText(this.files[0]);
  } else {
    console.warn("This browser does not support HTML5.");
  }
};

function generateSelect(target) {
    var selectList = document.createElement("select");
    selectList.className = 'form-control';
    target.appendChild(selectList);

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].val;
        option.text = options[i].label;
        selectList.appendChild(option);
    }
}

var generatedData = [];

document.addEventListener('change', function (e) {
  var _this    = e.target;
  var tdIndex  = _this.parentNode.cellIndex;
  var tbodyRow = document.querySelectorAll("tbody tr");
  var $selects = document.querySelectorAll('select');
    if (_this.nodeName == "SELECT") {
      for (var y = 0; y < $selects.length; y++) {
        if ([y] != tdIndex) {
          var $options = $selects[y].querySelectorAll('option');
          for (var x = 0; x < $options.length; x++) {
            if($options[x].value == _this.value) {
              //$options[x].disabled = true;
            }
          }
        }
      }
      for (var i = 0; i < tbodyRow.length; i++) {
        var cell = tbodyRow[i].querySelectorAll('td')
        generatedData.push({[_this.value] : cell[tdIndex].innerText});
      }
    }
}, false);

$actionBtn.addEventListener('click', function (e) {
  if (generatedData.length) {
    $outputData.classList.remove('hidden');
    $outputData.innerHTML = JSON.stringify(generatedData, null, 2);
  } else {
    alert("Please selecte at lease one of the options");
  }
}, false);
