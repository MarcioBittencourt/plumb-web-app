import Style from './assessement360.page.module.scss'
import Survey from './form/survey'
import Data360 from '../../assets/360.json'

const Assessement360Page = () => {
    return (
        <div id="page" className={Style.page}>
            <div id="title" className={Style.title}>
                <h1>Avaliação 360</h1>
            </div>
            <div className={Style.assessement}>
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
                <div className={Style.survey}>
                    <Survey askings={Data360.askings}/>
                </div>
            </div>
        </div>
    );
}
export default Assessement360Page;