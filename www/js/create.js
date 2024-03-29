form=[];

des_inf=
[
  [
    ['tag','div'],
    ['class','inputrowbigheader'],
    ['value','Designation Information'],
    ['required','0']
  ],
  [
    ['label','Equipment ID'],
    ['description','Denotes the equipment ID number'],
    ['tag','text'],
    ['input_placeholder','Equipment ID'],
    ['name','equipment_id'],
    ['sql','`equipment_id` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','D5']
  ],
  [
    ['label','Manufacturer'],
    ['description','Manufacturer of the specified device'],
    ['tag','text'],
    ['input_placeholder','Manufacturer'],
    ['name','manufacturer'],
    ['sql','`manufacturer` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','D6']
  ],
  [
    ['label','Model #'],
    ['description','Model # of the specified device'],
    ['tag','text'],
    ['input_placeholder','Model #'],
    ['name','model_number'],
    ['sql','`model_number` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','D7']
  ],
  [
    ['label','Serial #'],
    ['description','Serial # of the specified device'],
    ['tag','text'],
    ['input_placeholder','Serial #'],
    ['name','serial_number'],
    ['sql','`serial_number` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','D8']
  ],
  [
    ['label','University ID'],
    ['description','UoA ID of the specified device (if it has one)'],
    ['tag','text'],
    ['input_placeholder','University ID'],
    ['name','uark_id'],
    ['sql','`uark_id` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','D9']
  ],
  [
    ['label','Location'],
    ['description','Location of the specified device'],
    ['tag','text'],
    ['input_placeholder','Location'],
    ['name','location'],
    ['sql','`location` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','D10']
  ],
  [
    ['label','Calibration Date'],
    ['description','Date at which this calibration was performed'],
    ['tag','text'],
    ['input_placeholder','Date'],
    ['name','calibration_date'],
    ['sql','`calibration_date` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','J5']
  ],
  [
    ['tag','text'],
    ['label','Performed by'],
    ['description','Whom this calibration was performed by'],
    ['input_placeholder','Performed by'],
    ['name','performed_by'],
    ['sql','`performed_by` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','J6']
  ],
  [
    ['label','Next Calibration Due'],
    ['description','Date at which the next calibration is due'],
    ['tag','text'],
    ['input_placeholder','Next Calibration Due'],
    ['name','calibration_due'],
    ['sql','`calibration_due` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','J8']
  ],
  [
    ['label','Last Calibration'],
    ['description','Date at which the last calibration was performed'],
    ['tag','text'],
    ['input_placeholder','Last Calibration'],
    ['required','1'],
    ['name','calibration_last'],
    ['sql','`calibration_last` text COLLATE utf8_bin NOT NULL'],
    ['xl','J9']
  ],
  [
    ['label','Calibration Item'],
    ['description','What the calibration of the specified device to check/validate.'],
    ['tag','text'],
    ['input_placeholder','Calibration Item'],
    ['name','calibration_item'],
    ['sql','`calibration_item` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','C12']
  ],
  [
    ['label','Calibration Procedure'],
    ['description','Brief description of how the calibration is performed.'],
    ['input_placeholder','Calibration Procedure'],
    ['tag','text'],
    ['name','calibration_procedure'],
    ['sql','`calibration_procedure` text COLLATE utf8_bin NOT NULL'],
    ['required',1],
    ['xl','C14']
  ],
  [
    ['label','Calibration Equipment'],
    ['description','List any equipment used in the calibration of the device.'],
    ['tag','text'],
    ['input_placeholder','Calibration Equipment'],
    ['name','calibration_equipment'],
    ['sql','`calibration_equipment` text COLLATE utf8_bin NOT NULL'],
    ['required','1'],
    ['xl','C16']
  ],
  [
    ['tag','div'],
    ['class','inputrowbigheader'],
    ['value','Collected Data'],
    ['required','0']
  ]
];

options=
[
  'label',
  'class',
  'description',
  'tag',
  'value',
  'input_placeholder',
  'name',
  'sql',
  'required',
  'xl'
];

$(document).on('click','div#create-new-item, div#fixed-create-new-item',function(){
  form.push([]);
  form[form.length-1].push([]);
  render();
  $(document).scrollTop($('div#elm-'+(form.length-1)).offset().top-120);
});

$(document).on('click','div#output-php,div#fixed-output-php',function(){
  output();
  $(document).scrollTop($('div#containerinr').offset().top-120);
});

$(document).on('click','div.create-new-subitem',function(){
  bits=explode('create-subitem-',$(this).attr('id'));
  form[bits[1]].push([]);
  render();
  $(document).scrollTop($('div#elm-'+bits[1]).offset().top-120);
});

$(document).on('click','div.duplicate-item',function(){
  bits=explode('duplicate-item-',$(this).attr('id'));
  form.push([]);
  for(z=0;z<form[bits[1]].length;z++)
  {//item groups
    form[form.length-1][z]=[];
    for(x=0;x<form[bits[1]][z].length;x++)
    {//item
      console.log(form[bits[1]][z]);
      form[form.length-1][z].push(form[bits[1]][z][x]);
    }
  }
  render();
  $(document).scrollTop($('div#elm-'+bits[1]).offset().top-120);
});

$(document).on('click','div.create-new-subitem-group',function(){
  bits=explode('create-subitem-group-',$(this).attr('id'));
  form[bits[1]]=[];
  for(c=0;c<options.length;c++)
  {
    form[bits[1]].push([options[c]]);
  }
  render();
});

$(document).on('change','select.display-item-input',function(){
  bits=explode('select-name-',$(this).attr('id'));
  moarbits=explode('-',bits[1]);
  x=parseInt(moarbits[0]);
  y=parseInt(moarbits[1]);
  z=parseInt(moarbits[2]);
  console.log(x,y,z,$(this).val());
  form[x][y][z]=$(this).val();
  render();
});

$(document).on('change','input.display-item-input',function(){
  bits=explode('value-',$(this).attr('id'));
  moarbits=explode('-',bits[1]);
  x=parseInt(moarbits[0]);
  y=parseInt(moarbits[1]);
  z=parseInt(moarbits[2]);
  console.log(x,y,z,$(this).val()); form[x][y][z]=$(this).val();
  render();
});

$(document).on('click','div.display-item-delete',function(){
  bits=explode('delete-',$(this).attr('id'));
  moarbits=explode('-',bits[1]);
  x=moarbits[0];
  y=moarbits[1];
  form[x].splice(y,1);
  render();
});

$(document).on('click','div.display-delete-group',function(){
  bits=explode('delete-group-',$(this).attr('id'));
  form.splice(bits[1],1);
  render();
});

$(document).on('click','div#hide-code',function(){
  $('table#output').empty();
  $('table#output').toggle();
  $('div#hide-code').remove();
});

$(document).on('click','div#clear-form,div#fixed-clear-form',function(){
  form=[];
  render();
});

$(document).on('click','div#add-designation,div#fixed-add-designation',function(){
  for(z=0;z<des_inf.length;z++)
  {
    form.push(des_inf[z]);
  }
  render();
  $(document).scrollTop($('div#elm-'+(form.length-1)).offset().top-120);
});

function render()
{
  $('div#display').empty();
  for(z=0;z<form.length;z++)
  {
    $('div#display').append('<div class="display-item" id="elm-'+z+'">');
      for(x=0;x<form[z].length;x++)
      {
        $('div#elm-'+z).append('<div class="display-item-label">Name:</div>');
        $('div#elm-'+z).append('<select class="display-item-input" id="select-name-'+z+'-'+x+'-0">');
          $('select#select-name-'+z+'-'+x+'-0').append('<option disabled selected value>select an option</option>');
          for(c=0;c<options.length;c++)
          {
            $('select#select-name-'+z+'-'+x+'-0').append('<option value="'+options[c]+'">'+options[c]+'</option>');
          }
          if(form[z][x][0] != null)
          {
            $('select#select-name-'+z+'-'+x+'-0').val(form[z][x][0]);
          }
        $('div#elm-'+z).append('</select');
        $('div#elm-'+z).append('<div class="display-item-label">Value:</div>');
        if(form[z][x][1] != null)
        {
          $('div#elm-'+z).append('<input class="display-item-input" id="value-'+z+'-'+x+'-1" value="'+form[z][x][1]+'">');
        }
        else
        {
          $('div#elm-'+z).append('<input class="display-item-input" id="value-'+z+'-'+x+'-1">');
        }
        $('div#elm-'+z).append('<div class="display-item-delete" id="delete-'+z+'-'+x+'">delete</div>');
      }
      $('div#elm-'+z).append('<div class="create-new-subitem" id="create-subitem-'+z+'">Create new subitem</div>');
      $('div#elm-'+z).append('<div class="create-new-subitem-group" id="create-subitem-group-'+z+'">Create all subitems</div>');
      $('div#elm-'+z).append('<div class="duplicate-item" id="duplicate-item-'+z+'">Duplicate this to a new item</div>');
      $('div#elm-'+z).append('<div class="display-delete-group" id="delete-group-'+z+'">Delete item</div>');
    $('div#display').append('</div>');
  }
}

function explode(delimiter,string,limit=null)
{
  result=[];
  if(string.indexOf(delimiter)>-1)
  {
    bits=string.split(delimiter);
    if(bits.length>limit&&limit!==null)
    {
      temp='';
      for(z=0;z<limit;z++)
      {
        result[z]=bits[z];
      }
      for(z=limit;z<bits.length;z++)
      {
        temp+=bits[z];
      }
      result[limit]=temp;
      return result;
    }
    else
    {
      return bits;
    }
  }
  else
  {
      console.log('Supplied delimiter does not exist in string');
  }
}

function output()
{
  $('table#output').empty();
  $('table#output').show();
  if(!$('div#hide-code').length)
  {
    $('div#containerinr').prepend('<div id="hide-code">Hide PHP code</div>');
  }
  $('table#output').append('<tr><td class="output-line">[</td></tr>');
  for(z=0;z<form.length;z++)
  {
    $('table#output').append('<tr><td class="output-line">&nbsp;&nbsp;[</td></tr>');
    for(x=0;x<form[z].length;x++)
    {
      $('table#output').append('<tr><td class="output-line" id="line-'+z+'-'+x+'">&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>');
      if(x!=form[z].length-1)
        $('td#line-'+z+'-'+x).append("'"+form[z][x][0]+"'=>'"+form[z][x][1]+"',");
      else
        $('td#line-'+z+'-'+x).append("'"+form[z][x][0]+"'=>'"+form[z][x][1]+"'");
    }
    if(z!=form.length-1)
      $('table#output').append('<tr><td class="output-line">&nbsp;&nbsp;],</td></tr>');
    else {
      $('table#output').append('<tr><td class="output-line">&nbsp;&nbsp;]</td></tr>');
    }
  }
  $('table#output').append('<tr><td class="output-line">]</td></tr>');
}
