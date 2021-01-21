function get_data(dataPath) {
  const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
  request.open('GET', dataPath, false); // csvのパスを指定
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
    .attr('fill', '#f0f');

  var dots = svg
    .append('g')
    .selectAll("dot")
    .data(csv_data2)
    .enter()
    .append("circle")
    .attr('cy', function(d,i){return yScale(d.y);})
    .attr('cx', function(d,i){return xScale(d.x);})
    .attr('r', 4)
    .attr('fill', '	#000080');

}

var csv_data = get_data("avrg_n_spiral.csv");
var csv_data2 = get_data("avrg_file_2c.csv");
draw_graph(csv_data,csv_data2);
