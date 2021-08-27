window.onload = function(){
  $('#search').click(function(){
    search_pokemon();
  })
  $('#shiny').click(function(){
    show_shiny();
  })
};

const $doc = document
let result = $doc.getElementById("result");
let p = $doc.createElement('p');
let data = {};
const search_pokemon =function() {
    const text_box = $doc.getElementById("pokemon_num");
    const pokemon_num = text_box.value;
    let request = new XMLHttpRequest();
    request.open('GET', "https://pokeapi.co/api/v2/pokemon/"+pokemon_num+"/");
    request.onload = function () {
        data = JSON.parse(this.response);
        show_result(data,pokemon_num);
        show_image(data["sprites"]["front_default"],"front")
        show_image(data["sprites"]["back_default"],"back");
        //show_image(data["sprites"]["front_shiny"],"front_shiny");
        //show_image(data["sprites"]["back_shiny"],"back_shiny");
      };
    request.send();
};

const show_result =function(data,pokemon_num) {
    $(".result").css("display","block");
    const name = data["forms"][0]["name"];
    const type_1 = data["types"][0]["type"]["name"]
    let type_2 = "";
    if (data["types"].length >= 2){
      type_2 = data["types"][1]["type"]["name"];
    }
    $doc.getElementById('result_num').innerHTML = pokemon_num;
    $doc.getElementById('result_name').innerHTML =  name;
    if (type_2 !== ""){
      $doc.getElementById('result_type').innerHTML = type_1 + "/" + type_2;
    }
    else{
      $doc.getElementById('result_type').innerHTML = type_1
    }
};

const show_image = function(url,id){
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'anonymous';
    image.onload = function(){
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
      
      const src = canvas.toDataURL('image/png');
      $doc.getElementById(id).style.backgroundImage = `url(${src})`;
    };
};

const show_shiny = function(){
  show_image(data["sprites"]["front_shiny"],"front");
  show_image(data["sprites"]["back_shiny"],"back");
};


