import React from 'react'
import { API } from '../../backend'

export default function ImageHelper({product}) {
    const imageUrl = product ? `${API}/product/photo/${product._id}`: `https://cdn5.f-cdn.com/contestentries/221300/14823614/555ccf7f80c3f_thumb900.jpg`
    return (
        // <div className="rounded border border-success p-2">
                <img
                  src={imageUrl}
                  alt=""
                  // style={{ maxHeight: "100%", maxWidth: "100%" }}
                  // className="mb-3 rounded"
                />
              // </div>
    )
}
