import { useAppDispatch, useAppSelector } from '@/store';
import { getFinancialRecordsById } from '@/store/reducers/getFinancialRecords';
import calculateValue from '@/utils/calculateValue';
import formatNumber from '@/utils/formatNumber';
import dayjs from 'dayjs';
import { DollarSign, Wallet } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';
import Button from '../ui/Button';
import Alert from '../Alert';

const ExpeseView = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data, loading, error } = useAppSelector((state) => state.getFinancialRecords);
	const { id } = useParams() as { id: string };

	// const [scrollLocked, setScrollLocked] = useState(false);

	// const toggleScrollLock = () => {
	//     setScrollLocked(!scrollLocked);
	//     if (!scrollLocked) {
	//         document.body.classList.add('no-scroll');
	//     } else {
	//         document.body.classList.remove('no-scroll');
	//     }
	// };

	const handleToEdit = () => {
		navigate(`/expense/${id}`);
	};

	useEffect(() => {
		dispatch(getFinancialRecordsById({ id }));
	}, [dispatch, id]);

	// useEffect(() => {
	//     toggleScrollLock();
	// }, []);

	return (
		<div className="fade-in bg-black/10 h-[101vh] w-full fixed left-0 top-0 z-10 flex justify-between">
			<div className="p-0 shadow-lg h-full sm:w-full w-auto flex-1" onClick={() => navigate('/')} />

			{loading && (
				<div className="fade-in flex-center bg-white p-8  shadow-lg h-[101vh] sm:w-5/12 w-11/12">
					<Loader />
				</div>
			)}



			<div className="fade-in flex flex-col justify-between bg-white p-8 h-full sm:w-5/12 w-11/12">
				{error && (
					<Alert
						variant="danger"
						title="Ocorreu um erro"
						description={error}
						helpButton='Tentar novamente'
						onHelpClick={() => dispatch(getFinancialRecordsById({ id }))}
						onClose={() => navigate('/')}
					/>
				)}
				{data.value > 0 && !loading && (
					<div className="fade-in flex flex-col justify-between bg-white h-full w-full">
						<div className="space-y-4 pt-4">
							<h3 className="font-bold text-zinc-800 gap-2 flex items-center">
								<span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
									<Wallet size={20} />
								</span>
								{data.name}
								<span className="text-xs text-zinc-400 ml-4">{id}</span>
							</h3>
							<div className="flex items-end justify-between text-zinc-950">
								<h1 className=" text-3xl font-normal ">{formatNumber(data.value)}</h1>
								<div className="w-[48px] h-[48px] border border-slate-800 rounded-full flex-center">
									<DollarSign size={24} />
								</div>
							</div>
							<div className="py-4 rounded-lg relative  space-y-4">
								<div>
									<span className="text-zinc-500">Data:</span>
									<h1 className="text-zinc-950 text-base">
										{dayjs(data.due_date).format('DD [de] MMMM YYYY')}
									</h1>
								</div>
								<div>
									<span className="text-zinc-500">Orçamento:</span>
									<h1 className="text-zinc-950 text-base">{data.budget.name}</h1>
								</div>
								<div>
									<span className="text-zinc-500">Recorrência:</span>
									<h1>
										{calculateValue(
											data.duration || 0,
											data.payment_mode,
											data.periodicity_mode,
											data.value
										)}
									</h1>
								</div>
								<hr className="my-4 border-slate-200 border-dashed" />
								<div>
									<span className="text-zinc-500">Nota:</span>
									<h1 className="text-zinc-950 text-base">{data.note ? data.note : 'Sem nota'}</h1>
								</div>
							</div>
						</div>
						<Button variant="fill" width="full" onClick={handleToEdit}>
							Editar Entrada
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ExpeseView;
