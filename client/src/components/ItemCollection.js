import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const FOODS_QUERY = gql`
    query FoodsQuery {
        Foods {
            _id
            name
            count
            description
            weight
            upc
            dateBought
            bestBefore
        }
    }
`;




export class Foods extends Component {
    render() {
        return (
            <div>
<h1 className="display-4 my-3">Food Collection</h1>
  <Query query={FOODS_QUERY}>
    {
        ({ loading, error, data }) => {
            if (loading) return <h4>Loading... </h4>
                if (error) console.log(error);            
                    return <Fragment>
                    {
                        data.foods.map(item => (
                            <Item key={item._id}  food={food}/>
                        ))
                    }
                    </Fragment>;
                }
            }
  </Query>


        </div>
        )
    }
}




export default Launches





class ItemCollection extends Component {
  componentWillMount() {
    // this.props.fetchItems();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newItem) {
      this.props.Items.unshift(nextProps.newItem);
    }
  }
  render() {
    // console.log(this.props.Items);
    const ItemItems = this.props.Items.map(Item => (
      <div key={Item._id}>
        <h3>{Item.name}</h3>
        <h4>{Item.count}</h4>
        <p>{Item.description}</p>
        <p>{Item.weight}</p>
        <p>{Item.upc}</p>
        <p>{Item.dateBought}</p>
        <p>{Item.bestBefore}</p>
      </div>
    ));
    return (
      <div>
        <h1>Items</h1>
        {ItemItems}
      </div>
    );
  }
}

ItemCollection.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  Items: PropTypes.array.isRequired,
  newItem: PropTypes.object
};

const mapStateToProps = state => ({
  Items: state.items.items,
  newItem: state.items.item
});

export default ItemCollection;

