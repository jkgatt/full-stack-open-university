const Course = (props) => {
    return(
      <>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map((part) => {
          return (<Part key={part.id} part={part.name} exercise={part.exercises} />)
        })}
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
         <p>{props.part} {props.exercise}</p>
      </>
    )
  }
  
  const Total = (props) => {
    let total = props.parts.reduce((sum, part) => sum + part.exercises,0)
    return (
      <>
        <p>Number of exercises {total}</p>
      </>
    )
  }

export default Course
  