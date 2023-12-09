import ExpenseDTO from '@/http/api/DTO/ExpenseDTO';
import CacheManager from '@/utils/CacheManager';

const expenseCache = new CacheManager<ExpenseDTO[]>();

export { expenseCache };
