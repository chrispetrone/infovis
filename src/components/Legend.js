import Control from "react-leaflet-custom-control";
import './Legend.css';

function Legend({ data }) {
    // get color depending on population density value
    const colors = [
        { min: "Under ", max: "400K", color: '#edf8fb' },
        { min: "400K - ", max: "600K", color: '#b3cde3' },
        { min: "600K - ", max: "800K", color: '#8c96c6' },
        { min: "800K - ", max: "1MM", color: '#8856a7' },
        { min: "1MM - ", max: "1.2MM", color: '#810f7c' }
    ]
    let legend = []
    colors.forEach(element => {
        legend.push(
            < tr key={colors.indexOf(element)} >
                <td><i style={{ background: element.color }}></i></td>
                <td className='leftCol'>{element.min}</td><td></td><td className='rightCol'>{element.max}</td>
            </tr >
        );
    })

    return (
        <Control position="bottomright">
            <div className="info legend">
                <table>
                    <tbody>
                        {legend}
                    </tbody>
                </table>
                <span id="legend-title"></span>
            </div>
        </Control>
    )

}

export default Legend;
