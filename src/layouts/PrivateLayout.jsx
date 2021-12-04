
import Sidebar from 'components/Admin/Sidebar'
import NavbarAdmin from 'components/Admin/NavbarAdmin'
import PrivateRoute from 'components/Admin/PrivateRoute';

const PrivateLayout = ({ children }) => {

    return (
        <PrivateRoute>
            <div className="flex lg:flex-none flex-col justify-between h-screen overflow-y-hidden">

                <NavbarAdmin />

                <main className="h-full overflow-y-scroll overflow-x-hidden" >
                    <div className="w-full lg:w-4/5 lg:float-right  relative">
                        { children }
                    </div>
                </main>

                <Sidebar />

            </div>
        </PrivateRoute>

    )
}

export default PrivateLayout
