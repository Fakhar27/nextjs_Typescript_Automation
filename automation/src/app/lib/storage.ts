let mealPlan: string[] | null = null;

export function storeMealPlan(plan: string[]): void {
    mealPlan = plan;
}

export function getMealPlan(): string[] | null {
    return mealPlan;
}