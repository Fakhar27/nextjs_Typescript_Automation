import { NextRequest, NextResponse } from 'next/server';

let storedMealPlan: string[] | null = null; // In-memory storage for server-side

export async function POST(req: NextRequest) {
    try {
        const { meal_plan }: { meal_plan: string } = await req.json();
        console.log('Received meal_plan:', meal_plan);

        const days = meal_plan.split(/Day \d+:/g).filter(Boolean);

        const formattedMealPlan = days.map((day, index) => {
            return `Day ${index + 1}:${day.trim()}`;
        });

        storedMealPlan = formattedMealPlan;

        console.log('Stored meal plan:', storedMealPlan);

        return NextResponse.json({ message: 'Meal plan received and stored successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing meal plan:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

export async function GET() {
    try {
        console.log('Attempting to retrieve meal plan');

        if (!storedMealPlan) {
            console.log('No meal plan available in server memory');
            return NextResponse.json({ error: 'No meal plan available' }, { status: 404 });
        }

        console.log('Retrieved meal plan:', storedMealPlan);
        return NextResponse.json({ mealPlan: storedMealPlan }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving meal plan:', error);
        return NextResponse.json({ error: 'Failed to retrieve meal plan' }, { status: 500 });
    }
}