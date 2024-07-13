import Header from "../components/header"
import NewFoods from "../components/newFoods"
// import RecommendedFoods from "../components/recommendedFoods"
import Service from "../components/service"
import Service2 from "../components/service2"
import SpecialFoods from "../components/specialFoods" 

 
const Home = () => { 
  return (<>
   <Header/> 
    
    <NewFoods/>
   {/* <RecommendedFoods/> */}
   <Service/>
   <SpecialFoods/>
   <Service2/>
  

  </>
  
  )
}

export default Home