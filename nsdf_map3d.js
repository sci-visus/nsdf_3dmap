
let Node = class  {constructor() {}};

let Map3d = class {
	
	//constructor
	constructor(token, div_name="nsdf_map3d_div") {
		
		Cesium.Ion.defaultAccessToken=token;
		this.viewer = new Cesium.Viewer(div_name);
		this.nodes={};
		this.edges=[];
	}
	
	//addNode
	addNode(name, x, y, visible=true, img="", description="")
	{
		if (this.nodes.hasOwnProperty(name))
			throw "Node already in the nodes " + name;
			
		if (description=="")
			description=name;
		
		var node=new Node();
		node.name=name;
		node.pos=[x,y];
		
		//console.log("Adding node", node);
		
		if (visible)
		{
			var entity={
				name : node.name,
				position : Cesium.Cartesian3.fromDegrees(node.pos[0], node.pos[1]),
				point : {
					pixelSize : 15,
					color : Cesium.Color.LIGHTBLUE
				},
				label : {
					text : node.name,
					font : '16pt monospace',
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
				}
			};
			
			if (img!="")
				entity.billboard={image : img};
			
			entity.description=description;
			this.viewer.entities.add(entity);
		}		
		
		this.nodes[name]=node;
		return node;
	}	
	
	//addEdge
	addEdge(from,to,width=3, color=Cesium.Color.CORNFLOWERBLUE)
	{
		if (!this.nodes.hasOwnProperty(from))
			throw "internal error cannot find " + from;
			
		if (!this.nodes.hasOwnProperty(to))
			throw "internal error cannot find " + to;
		
	  //console.log("Adding edge", edge.from, edge.to);
		this.viewer.entities.add(
	  {
	    name: "Link " + from + " --- " + to,
	    polyline: {
	      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
	        this.nodes[from].pos[0], this.nodes[from].pos[1],250,
	        this.nodes[to  ].pos[0], this.nodes[to  ].pos[1],250]),
	        width: width,
	        material: new Cesium.PolylineOutlineMaterialProperty({
	          color: color,
	          outlineWidth: 1,
	          outlineColor: Cesium.Color.BLACK,
	        }),
	      },
		});	  
	  
	}	

	
};


var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MjJiMmQ1Zi1kMDYxLTQ0ODgtYmUzYi0wZjQ2OTkyMjQxY2IiLCJpZCI6Njk1MzcsImlhdCI6MTYzMzU2NTY0Mn0.TRiTw4OhDxMi56-vQoXURNKgA9U31PSLozCsQAMpdcs";
var map=new Map3d(token);
map.viewer.dataSources.add(Cesium.KmlDataSource.load('./poi.kml'));





