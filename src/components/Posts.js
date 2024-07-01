import React from 'react'

const Posts = ({post}) => {
    const {body,id,reactions,tags,title,userId,views} = post;
  return (
    <div>
        <div>
            {title}
        </div>
        <div>
            {body}
        </div>
        <div>
            {reactions?.likes}
        </div>
        <div>
        {reactions?.dislikes}
        </div>
    </div>
  )
}

export default Posts