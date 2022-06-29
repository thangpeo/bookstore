import React from 'react'

const Helmet = (props) => {
    document.title =  props.title
    React.useEffect(() => {
      window.scrollTo(0,0)
    }, [])
    
  return (
    <div>
        {props.children}
    </div>
  )
}

export default Helmet