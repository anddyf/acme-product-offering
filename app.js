const root = document.querySelector('#root');
const { HashRouter, Switch, Link, Route, Redirect } = ReactRouterDOM;
const { Component } = React;

const Data = ({props}) => {
    if (!props) {
        return <div>loading</div>;
    }
        return (
            <div>
                <ul>
                {props.map(  item => {
                    return (
                    <li>
                        {item.name}
                    </li>
                    )
                })}
                </ul>
            </div>
        )
}

const Nav = () => {
    return (
        <nav>
            <Link to ='/companies'>Companies</Link>
            <Link to ='/products'>Products</Link>
        </nav>
    )
}


class App extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            companies: [],
            offerings: [],
        }
    }

    componentDidMount() { 
        Promise.all([axios.get('https://acme-users-api-rev.herokuapp.com/api/products'), axios.get('https://acme-users-api-rev.herokuapp.com/api/companies'), axios.get('https://acme-users-api-rev.herokuapp.com/api/offerings')]) 
        .then (([products, companies, offerings]) => {
            this.setState({products, companies, offerings})
            // console.log('state:', this.state)
        })
        .catch(e => console.log(e))
   
    }

    render() {
        // console.log('render', this.state.products.data)
        const { products } = this.state;
        const { companies } = this.state;
        return (
        // Products(this.state.products)
            <HashRouter>
                <Route component= {Nav}/>
                <Route path='/products' render={() =>  <Data props={ products.data }/>} />
                <Route path='/companies' render={() =>  <Data props={ companies.data }/>} />
            </HashRouter>
        )
    }
} 

ReactDOM.render(<App/>, root)