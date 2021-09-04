import Style from './a360.page.module.scss'
import Survey from '../components/a360/survey'
import Data360 from '../assets/360.json'
import Dashboard from '../components/a360/dashboard/index'
const Assessement360Page = () => {
    return (
        <div className={Style.page}>
            <Dashboard />
        </div>
    );
}
/*<div className={Style.page}>
            <h1 className={Style.title}>Avaliação 360</h1>
            <div className={Style.description}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Sollicitudin tempor id eu nisl nunc mi ipsum. Ipsum nunc aliquet bibendum enim facilisis.
                    Vitae justo eget magna fermentum iaculis eu non.
                    Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor.
                    Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Nec ullamcorper sit amet risus.
                    Condimentum mattis pellentesque id nibh tortor id. At volutpat diam ut venenatis tellus in.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Sollicitudin tempor id eu nisl nunc mi ipsum. Ipsum nunc aliquet bibendum enim facilisis.
                    Vitae justo eget magna fermentum iaculis eu non.
                    Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor.
                    Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Nec ullamcorper sit amet risus.
                    Condimentum mattis pellentesque id nibh tortor id. At volutpat diam ut venenatis tellus in.</p>
            </div>
            <Survey askings={Data360.askings} />
    </div> */
export default Assessement360Page;