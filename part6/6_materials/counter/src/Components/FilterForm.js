import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const FilterForm = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))} />
            all 
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))} />
            important 
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
            nonimportant 
        </div>
    )
}

export default FilterForm