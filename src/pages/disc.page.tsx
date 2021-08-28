import DISCData from '../assets/disc.json'
import Survey from '../components/disc/survey';
import Style from './disc.page.module.scss'

const DISCPage = () => {
    return (
        <div className={Style.page}>
            <div className={Style.instructions}>
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
            <div className={Style.webform}>
                <Survey askings={DISCData.askings} />
            </div>
            
        </div>
    )
}
export default DISCPage;