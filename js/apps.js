//localStorage.clear();
//Cluster Model
var clusterItem = Backbone.Model.extend({
		defaults: {
				id : "cluster-1",
				email : "example@domain.com",
				password : "password",
				status : true,
				servers :[
				    {
					sid : "",
					role : "",
					memory_gb : 256,
					tags : "",
					installed_image : "",
					interfaces : [
					    {
							tid : "",
							ip_address : "",
							mac_address : ""
						}
					],
					management_interface : ""
				}
				]
			}
});
//Cluster Collection
var clusterList = Backbone.Collection.extend({
		model: clusterItem,
		localStorage: new Store("backbone-cluster")
});
//Cluster Collection Instance
var items = new clusterList();
//Cluster View
var clusterView = Backbone.View.extend({
	model: new clusterItem(),
	tagName: 'div',
	template: _.template($('#cluster-form').html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	initialize: function(){
		this.model.on('destroy', this.remove, this);
	},
	events: {
		'click #cluster-edit': 'edit',
		'click #cluster-update': 'update',
		'click #cluster-delete': 'delete'
	},
	edit: function(){
		this.$('#cluster-edit').hide();
		this.$('#cluster-delete').hide();
		this.$('#cluster-update').show();
		var id = this.$('#form-1-id').html();
		var email = this.$('#form-1-email').html();
		var paswd = this.$('#form-1-paswd').html();
		var status = this.$('#form-1-status').html();
		this.$('#form-1-id').html('<input type="text" class="form-control form-1-id-upd" value="' + id + '">' );
		this.$('#form-1-email').html('<input type="email" class="form-control form-1-email-upd" value="' + email + '">' );
		this.$('#form-1-paswd').html('<input type="password" class="form-control form-1-paswd-upd" value="' + paswd + '">' );
		this.$('#form-1-status').html('<input type="text" class="form-control form-1-status-upd" value="' + status + '">' );
	},
	update: function(){
		this.model.set('id', $('.form-1-id-upd').val());
		this.model.set('email', $('.form-1-email-upd').val());
		this.model.set('password', $('.form-1-paswd-upd').val());
		this.model.set('status', $('.form-1-status-upd').val());
	},
	delete: function(){
		this.model.destroy();
	}
});
//App View
var AppView = Backbone.View.extend({
	model: items,
	el: $('.container-2'),
	initialize: function(){
		var self=this;
		this.model.on('add', this.render, this);
		this.model.on('change', function(){
			setTimeout(function(){
				self.render();
			},30)
		},this);
	},
	render: function(){
		var self = this;
		this.$el.html("");
		_.each(items.toArray(), function(item){
			self.$el.append((new clusterView({model: item})).render().$el);
		});
		return this;
	}
});

var app = new AppView();
$('#cluster-add').click(function(){
		var item = new clusterItem({
			id : $('#c-in-id').val(),
			email : $('#c-in-email').val(),
			password : $('#c-in-paswd').val(),
			status : $('#c-in-status').val()
		});
		items.add(item);
		$('#c-in-id').val('');
		$('#c-in-email').val('');
		$('#c-in-paswd').val('');
		$('#c-in-status').val('');
});

