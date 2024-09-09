import pokeball from '../../assets/pokeball.gif'
import './pokeball.scss'

export default function Pokeball() {
  return (
    <div className='pokeball'>
			<img src={pokeball} alt='pokeball' />
		</div>
  );
}
