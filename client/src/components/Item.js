import React from 'react'
import classNames from 'classnames';

import { Link } from 'react-router-dom';


export default function FoodItem({launch: {_id, name, dateBought, launch_success }}) {
    
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-mg-9">
                    <h4> { name } </h4>
                    <p>Date: { dateBought } </p>
                </div>
                <div className="col-md-3">
                    <Link to={`/Food/${_id}`} className="btn btn-secondary">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}
