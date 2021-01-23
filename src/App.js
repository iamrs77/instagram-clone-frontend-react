import {
    BrowserRouter,
    Switch,
} from "react-router-dom";
import routes from './navigation/routes';
import AuthenticatedRouting from './navigation/AuthenticatedRouting';

function App() {
    return (
        <div className="App min-w-360">
            <BrowserRouter>
			<Switch>
                    {routes.map((route) => {
                        return (
                            <AuthenticatedRouting
                                key={route.key}
                                path={route.path}
                                components={route.components}
                            />
                        );
                    })}
                </Switch>
			</BrowserRouter>
        </div>
    );
}

export default App;
