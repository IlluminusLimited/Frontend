import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Pin from './Pin';

class App extends Component {
    state = {
        pins: []
    };
    makeFetch() {
        fetch('http://api-dev.pinster.info/v1/pins')
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.log('error');
                    console.log(error);
                }
            )
            .then(data => {
                // Display the pins
                console.log(data);
            });
    }
    componentDidMount() {
        this.setState({
            pins: [
                {
                    id: 'p001',
                    name: 'Denver Hummingbird',
                    img: 'denver.jpg',
                    description:
                        'Green Hummingbird with red breast drinking from blue flower.',
                    maker: 'Denver DI',
                    year: 2018,
                    tags: ['Justo Dapibus Ullamcorper Porta Mattis']
                },
                {
                    id: 'p002',
                    name: 'DIVA galaxy',
                    img: 'diva-1.jpg',
                    description: 'round galaxy swirl',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Dapibus Justo Mattis Porta Ullamcorper']
                },
                {
                    id: 'p003',
                    name: 'DIVA Fractal',
                    img: 'diva-2.jpg',
                    description:
                        'round ping, white glittery background, gold (julia?) fractal swirl',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Justo Dapibus Mattis']
                },
                {
                    id: 'p004',
                    name: 'DIVA green shell',
                    img: 'diva-3.jpg',
                    description: 'green shell',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Ullamcorper Porta Mattis']
                },
                {
                    id: 'p005',
                    name: 'diva orange/red shell',
                    img: 'diva-4.jpg',
                    description: "orange red shell, maybe it's a flower?",
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Justo Mattis Ullamcorper Porta']
                },
                {
                    id: 'p006',
                    name: 'DIVA blue shell',
                    img: 'diva-5.jpg',
                    description: 'blue glittery shell',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Dapibus Justo Mattis']
                },
                {
                    id: 'p007',
                    name: 'Dragons!',
                    img: 'dragons.jpg',
                    description: 'Set of skeletal dragons breathing fire',
                    maker: 'Some team.. maybe in Ohio?',
                    year: 2018,
                    tags: ['Justo Porta Mattis']
                },
                {
                    id: 'p010',
                    name: 'monochrome feathers',
                    img: 'feathers.jpg',
                    description: 'set of gold, set of silver feathers',
                    maker: 'A Texas region?',
                    year: 2018,
                    tags: ['Justo Porta Mattis Dapibus Ullamcorper']
                },
                {
                    id: 'p011',
                    name: 'ILDI Door Knockers',
                    img: 'ildi-knockers.jpg',
                    description: 'full set of ildi knockers',
                    maker: 'ILDI',
                    year: 2018,
                    tags: ['Justo Dapibus Porta Mattis']
                },
                {
                    id: 'p012',
                    name: 'MDDI Butterflies',
                    img: 'mddi-butterfly-set.jpg',
                    description: 'interlocking colorful butterflies from MDDI',
                    maker: 'MDDI',
                    year: 2018,
                    tags: ['Justo Dapibus Ullamcorper']
                },
                {
                    id: 'p013',
                    name: 'NEXT Animals',
                    img: 'next-set.jpg',
                    description: 'geometric animals',
                    maker: 'NEXT',
                    year: 2018,
                    tags: ['Dapibus Justo Mattis']
                },
                {
                    id: 'p014',
                    name: 'nh kaleidoscope set',
                    img: 'nh-set.jpg',
                    description:
                        'full set of kaleidoscope pins with center piece',
                    maker: 'NHDI',
                    year: 2018,
                    tags: ['Justo Ullamcorper Porta']
                },
                {
                    id: 'p015',
                    name: 'WGMS School Pin',
                    img: 'wgms.jpg',
                    description: 'WGMS school shirt converted into a pin',
                    maker: 'WGMS',
                    year: 2018,
                    tags: ['Ullamcorper Justo Dapibus Porta Mattis']
                },
                {
                    id: 'p016',
                    name: 'Denver Hummingbird',
                    img: 'denver.jpg',
                    description:
                        'Green Hummingbird with red breast drinking from blue flower.',
                    maker: 'Denver DI',
                    year: 2018,
                    tags: ['Ullamcorper Porta Justo Dapibus Mattis']
                },
                {
                    id: 'p017',
                    name: 'DIVA galaxy',
                    img: 'diva-1.jpg',
                    description: 'round galaxy swirl',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Porta Mattis Justo Dapibus Ullamcorper']
                },
                {
                    id: 'p020',
                    name: 'DIVA Fractal',
                    img: 'diva-2.jpg',
                    description:
                        'round ping, white glittery background, gold (julia?) fractal swirl',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Dapibus Justo Porta Mattis Ullamcorper']
                },
                {
                    id: 'p021',
                    name: 'DIVA green shell',
                    img: 'diva-3.jpg',
                    description: 'green shell',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Porta Dapibus Ullamcorper Mattis Justo']
                },
                {
                    id: 'p022',
                    name: 'diva orange/red shell',
                    img: 'diva-4.jpg',
                    description: "orange red shell, maybe it's a flower?",
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Dapibus Ullamcorper Mattis Porta']
                },
                {
                    id: 'p023',
                    name: 'DIVA blue shell',
                    img: 'diva-5.jpg',
                    description: 'blue glittery shell',
                    maker: 'DIVA',
                    year: 2018,
                    tags: ['Justo Mattis Dapibus Porta']
                },
                {
                    id: 'p024',
                    name: 'Dragons!',
                    img: 'dragons.jpg',
                    description: 'Set of skeletal dragons breathing fire',
                    maker: 'Some team.. maybe in Ohio?',
                    year: 2018,
                    tags: ['Mattis Justo Porta Ullamcorper']
                },
                {
                    id: 'p025',
                    name: 'monochrome feathers',
                    img: 'feathers.jpg',
                    description: 'set of gold, set of silver feathers',
                    maker: 'A Texas region?',
                    year: 2018,
                    tags: ['Justo Ullamcorper Dapibus Mattis']
                },
                {
                    id: 'p026',
                    name: 'ILDI Door Knockers',
                    img: 'ildi-knockers.jpg',
                    description: 'full set of ildi knockers',
                    maker: 'ILDI',
                    year: 2018,
                    tags: ['Dapibus Porta Ullamcorper Mattis']
                },
                {
                    id: 'p027',
                    name: 'MDDI Butterflies',
                    img: 'mddi-butterfly-set.jpg',
                    description: 'interlocking colorful butterflies from MDDI',
                    maker: 'MDDI',
                    year: 2018,
                    tags: ['Dapibus Justo Ullamcorper Porta']
                },
                {
                    id: 'p030',
                    name: 'NEXT Animals',
                    img: 'next-set.jpg',
                    description: 'geometric animals',
                    maker: 'NEXT',
                    year: 2018,
                    tags: ['Justo Ullamcorper Dapibus Porta']
                },
                {
                    id: 'p031',
                    name: 'nh kaleidoscope set',
                    img: 'nh-set.jpg',
                    description:
                        'full set of kaleidoscope pins with center piece',
                    maker: 'NHDI',
                    year: 2018,
                    tags: ['Ullamcorper Justo Mattis Porta']
                },
                {
                    id: 'p032',
                    name: 'WGMS School Pin',
                    img: 'wgms.jpg',
                    description: 'WGMS school shirt converted into a pin',
                    maker: 'WGMS',
                    year: 2018,
                    tags: ['Justo Dapibus Porta Mattis']
                }
            ]
        });
    }
    render() {
        return (
            <div className="App">
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header> */}
                <div className="pin-collection">
                    {Object.keys(this.state.pins).map(key => (
                        <Pin key={key} pinData={this.state.pins[key]} />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
