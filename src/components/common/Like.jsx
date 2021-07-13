import React from "react";

function Like({ isLiked, onLike }) {
  const getLikeClasses = () => {
    const classes = "pointer fa fa-heart";
    return isLiked ? classes + " text-danger" : classes + "-o";
  };

  return <i className={getLikeClasses()} onClick={onLike}></i>;
}

export default Like;
