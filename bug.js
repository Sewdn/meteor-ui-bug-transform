if (Meteor.isClient) {
  var chars = "abcdefghijklmnopqrstuvwxyz";
  randomIndex = function(){
    return Math.round(Random.fraction() * chars.length);
  };

  Session.setDefault('sort', -1);
  Session.setDefault('pivot', randomIndex());

  var items = new Meteor.Collection(null,{
    transform: function (doc) { return new Item(doc); }
  });

  Item = function (doc) {
    _.extend(this, doc);
  };

  _.extend(Item.prototype, {
    isSelected: function(){
      return Session.equals('selectedItem', this._id);
    },
    select: function(){
      return Session.set('selectedItem', this._id);
    },
    test: function(){
      return ' v ';
    }
  });

  Template.test.items = function () {
    return items.find({
      number: {$lt: Session.get('pivot')}
    }, {
      sort: {
        title: Session.get('sort')
      }
    });
  };

  Template.test.events({
    'click a.sort': function(){
      Session.set('sort', -1 * Session.get('sort'));
    },
    'click a.insert': function(){
      items.insert({title: 'new item ' + chars.charAt(randomIndex())});
    },
    'click a.criteria': function(){
      Session.set('pivot', randomIndex());
    },
    'click li': function(){
      this.select();
    }
  });

  Meteor.startup(function(){
    for(var i=0; i<chars.length; i++){
      items.insert({title: 'test item ' + chars.charAt(i), number: i});
    }
  });
}