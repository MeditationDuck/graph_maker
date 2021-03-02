// !!!!!! まずは消えちゃってもいいようにこのフォルダをコピーしたものをとっておきましょう！！
// !!!!必要なのは myScript.js とindex.HTMLです！

///!!!!フォルダを開くやつ（ファイルエクスプローラ）からindex.htmlをブラウザにドラッグアンドドロップしてください！
///!!するとブラウザにはグラフが出るはずです！！
////確認できたらここのすくりぷとの一番下まで行ってみて↓  あんまりほかは触らないほうが身のため！！！！！


function get_data(dataPath) {
  const request = new XMLHttpRequest(); 
  request.open('GET', dataPath, false); 
  request.send(null);
  var csvArr = [];
  var lines = request.responseText.split("\n");
  for(var i = 0; i < lines.length; ++i) {
    var cells = lines[i].split(",");
    if (cells.length != 1){
      csvArr.push(cells);
    }
  }
  // return csvArr;
  var data = [];
  for (var i = 0; i< csvArr.length; i++){
    if(i > 0){
      data.push({x:csvArr[i][14],y:csvArr[i][15]});

    }
  }
  return data; 
}
// var csv_data = get_data("avrg_n_spiral.csv");


// console.dir(data);
// console.dir(csv_got_data);
// var csv_data = data;
// // get csv data !!!!!!!!!!!!!!!!!!!!!!
// var csv_data = d3.csv('csv_got_data', function(d) {
// // var csv_data = d3.csv("test.csv", function(d) {
//     return {
//     //   x: d.Make,
//     //   y: d.Model,
//         x: d.xs,
//         y: d.ys,
//     };
//   });
// console.dir(csv_data);

// console.log("test");
// console.dir(csv_data);

function change_rate(csv_data, csv_data2){
  var data = [];
  // data.push({x:0, y:0});
  for(var i = 0; i < csv_data.length && i < csv_data2.length; i ++){

    console.dir(csv_data[i]);
    console.dir(csv_data[i]["x"]);
    console.dir(csv_data[i]["y"]);
    var x_rate = (csv_data2[i].x - csv_data[i].x) / csv_data[i].x;
    var y_rate = (csv_data2[i].y - csv_data[i].y) / csv_data[i].y;
    data.push({x:x_rate, y:y_rate});
  }
  console.dir(data);
  
  var scale_domain_range = 2.5;
  

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  var size = {
    width: 1000 - margin.left - margin.right,
    height: 1000 - margin.top - margin.bottom
  }

  var	svg = d3.select("body")
    .append("svg")
    .attr("width", size.width + margin.left + margin.right)
    .attr("height",  size.height + margin.top + margin.bottom)  

  var yScale = d3.scaleLinear()
    // .domain([0, d3.max(csv_data, d => d.y)])
    .domain([- scale_domain_range, scale_domain_range])
    .range([50, size.height]);

  var xScale = d3.scaleLinear()
    .domain([- scale_domain_range, scale_domain_range])
    .range([50, size.width]);


  svg.append("g")
    .attr("transform", "translate(60, 0)")
    
    .call(
      d3.axisLeft()
      .scale(yScale) 
    );

  // var x_axis = d3.axisTop().scale(xScale);
  svg.append("g")
    .attr("transform", "translate(0, 60)")
    .call(
      d3.axisTop()
      .scale(xScale) 
    );

    var dots = svg
    .append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', function(d,i){return yScale(d.y);})
    .attr('cx', function(d,i){return xScale(d.x);})
    .attr('r', 4)
    .attr('fill', '#11111');
  
  svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("text")
    .data(data)
    .join("text")
      //.attr("text-anchor", )
      .attr("x", function(d,i){return xScale(d.x) -4;})
      .attr("y", function(d,i){return yScale(d.y) -10;})
      .text(function (d, i) {
        return i + 1;
      });
}     

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function change_rate_x(csv_data, csv_data2){
  var data = [];
  // data.push({x:0, y:0});
  for(var i = 0; i < csv_data.length && i < csv_data2.length; i ++){

    console.dir(csv_data[i]);
    console.dir(csv_data[i]["x"]);
    console.dir(csv_data[i]["y"]);
    var x_rate = (csv_data2[i].x - csv_data[i].x) / csv_data[i].x;
    var y_rate = (csv_data2[i].y - csv_data[i].y) / csv_data[i].y;
    data.push({x:x_rate, y:y_rate});
  }
  console.dir(data);
  
  var scale_domain_range = 2.5;
  

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  var size = {
    width: 1000 - margin.left - margin.right,
    height: 1000 - margin.top - margin.bottom
  }

  var	svg = d3.select("body")
    .append("svg")
    .attr("width", size.width + margin.left + margin.right)
    .attr("height",  size.height + margin.top + margin.bottom)  

  var yScale = d3.scaleLinear()
    // .domain([0, d3.max(csv_data, d => d.y)])
    .domain([- scale_domain_range, scale_domain_range])
    .range([50, size.height]);

  var xScale = d3.scaleLinear()
    .domain([0, 25])
    .range([50, size.width]);


  svg.append("g")
    .attr("transform", "translate(60, 0)")
    
    .call(
      d3.axisLeft()
      .scale(yScale) 
    );

  // var x_axis = d3.axisTop().scale(xScale);
  svg.append("g")
    .attr("transform", "translate(0, 60)")
    .call(
      d3.axisTop()
      .scale(xScale) 
    );

    var dots = svg
    .append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', function(d,i){return yScale(d.x);})
    .attr('cx', function(d,i){return xScale(i);})
    .attr('r', 4)
    .attr('fill', '#11111');
  
  svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("text")
    .data(data)
    .join("text")
      //.attr("text-anchor", )
      .attr("x", function(d,i){return xScale(i) -4;})
      .attr("y", function(d,i){return yScale(d.x) -10;})
      .text(function (d, i) {
        return i + 1;
      });
}     




// draw graph !!!!!!!!!!!!!!!!!
function draw_graph(csv_data, csv_data2){
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  var size = {
    width: 1000 - margin.left - margin.right,
    height: 1000 - margin.top - margin.bottom
  }

  var	svg = d3.select("body")
    .append("svg")
    .attr("width", size.width + margin.left + margin.right)
    .attr("height",  size.height + margin.top + margin.bottom)  

  var yScale = d3.scaleLinear()
    // .domain([0, d3.max(csv_data, d => d.y)])
    .domain([-5, 400])
    .range([50, size.height]);

  var xScale = d3.scaleLinear()
    .domain([-5, 400])
    .range([50, size.width]);


  svg.append("g")
    .attr("transform", "translate(60, 0)")
    .call(
      d3.axisLeft()
      .scale(yScale) 
    );

  // var x_axis = d3.axisTop().scale(xScale);
  svg.append("g")
    .attr("transform", "translate(0, 60)")
    .call(
      d3.axisTop()
      .scale(xScale) 
    );



  var dots = svg
    .append('g')
    .selectAll("dot")
    .data(csv_data)
    .enter()
    .append("circle")
    .attr('cy', function(d,i){return yScale(d.y);})
    .attr('cx', function(d,i){return xScale(d.x);})
    .attr('r', 4)
    .attr('fill', '#000');

  var rect_aspect = 6;
  var dots = svg
    .append('g')
    .selectAll("dot")
    .data(csv_data2)
    .enter()
    .append("rect")
    .attr('y', function(d,i){return yScale(d.y);})
    .attr('x', function(d,i){return xScale(d.x);})
    .attr('width', rect_aspect)
    .attr('height', rect_aspect)
    .attr('fill', '	#000');

}
                                             /// 比較したい2つのグラフをこのファイルと同じフォルダ内に入れてください！
// var csv_data = get_data("avrg_n_spiral.csv");/// ●   ここのダブルクオーテーションの中身をダウンロードしたcsv名に変更してください。
// var csv_data2 = get_data("avrg_file_2c.csv");/// ■   2つ目のグラフはこちらのダブル、、、、     その後ブラウザの↻右ねじの法則の矢印を押すと（またはctrl + R）新しいものができてるはずです！
// draw_graph(csv_data,csv_data2);               ///もともとあったcsvは消さなくても動くはずです。邪魔だったら消しましょう！！
// change_rate(csv_data, csv_data2);     /// !argv0 is base.

function make_graphs(csv1_name, csv2_name) {
  //document.write(csv1_name + "\t" + csv2_name);
  var csv_data = get_data(csv1_name);
  var csv_data2 = get_data(csv2_name);
  
  draw_graph(csv_data,csv_data2);               ///もともとあったcsvは消さなくても動くはずです。邪魔だったら消しましょう！！
  change_rate(csv_data, csv_data2);
}

//make_graphs("avrg_n_spiral.csv","avrg_file_2c.csv");
//make_graphs("落ちるデータ - avrg Al 3c.csv", "落ちるデータ - avrg n spiral 12g .csv");
// make_graphs("落ちるデータ - avrg Al 2c.csv", "落ちるデータ - avrg n spiral 12g .csv");
// make_graphs("落ちるデータ - avrg sponge 2c.csv", "落ちるデータ - avrg n spiral 18g.csv");
// make_graphs("落ちるデータ - avrg spiral sponge 3c.csv", "落ちるデータ - avrg n spiral 22g.csv");
make_graphs("落ちるデータ - avrg file 2c.csv", "落ちるデータ - avrg n spiral 13g.csv");
