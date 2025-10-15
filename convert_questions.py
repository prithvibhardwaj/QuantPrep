import json
import random

def estimate_time(difficulty):
    """Estimate time based on difficulty"""
    if difficulty == "Easy":
        return random.choice([60, 90, 120])
    elif difficulty == "Medium":
        return random.choice([120, 180, 240])
    else:  # Hard
        return random.choice([240, 300, 360])

def is_numerical_answer(answer_hint):
    """Check if answer is numerical"""
    if not answer_hint:
        return False
    
    first_part = answer_hint.split()[0] if answer_hint else ""
    numeric_indicators = ['$', '%', '°', 'degrees', 'days', 'minutes', 'years', 'approximately']
    
    try:
        float(first_part.replace('$', '').replace(',', '').replace('%', '').replace('~', ''))
        return True
    except:
        if any(indicator in answer_hint.lower()[:50] for indicator in numeric_indicators):
            return True
        return False

def extract_answer(answer_hint):
    """Extract the main answer from answer hint"""
    if not answer_hint:
        return "Answer not provided"
    
    parts = answer_hint.split('.')
    if parts:
        main_answer = parts[0].strip()
        # Clean up common prefixes
        main_answer = main_answer.replace('Answer:', '').replace('Solution:', '').strip()
        return main_answer
    
    return answer_hint[:100].strip()

def generate_numerical_options(correct_answer):
    """Generate plausible wrong options for numerical answers"""
    try:
        clean_answer = correct_answer.replace('$', '').replace(',', '').replace('%', '').replace('~', '').replace('approximately', '').replace('about', '').strip()
        
        num = float(clean_answer.split()[0])
        
        options = [correct_answer]
        
        # Generate variations
        if num > 10:
            options.append(str(int(num * 0.75)))
            options.append(str(int(num * 1.25)))
            options.append(str(int(num * 1.5)))
        else:
            options.append(str(round(num * 0.8, 2)))
            options.append(str(round(num * 1.3, 2)))
            options.append(str(round(num * 1.6, 2)))
        
        random.shuffle(options)
        return options[:4]
    except:
        return [correct_answer, "Not applicable", "Cannot determine", "Insufficient information"]

def generate_conceptual_options(question, correct_answer):
    """Generate plausible wrong options for conceptual questions"""
    
    generic_options = [
        "Cannot be determined without additional information",
        "Depends on market conditions",
        "None of the above",
        "Insufficient information provided",
        "It's impossible to determine",
        "They are equal",
        "No direct relationship",
        "Always true in all cases",
        "Never true",
        "Sometimes true, sometimes false"
    ]
    
    options = [correct_answer]
    
    # Add opposite if applicable
    if "yes" in correct_answer.lower() or "possible" in correct_answer.lower():
        options.append("No, it's impossible")
    elif "no" in correct_answer.lower() or "impossible" in correct_answer.lower():
        options.append("Yes, always possible")
    elif "increase" in correct_answer.lower():
        options.append(correct_answer.replace("increase", "decrease").replace("Increase", "Decrease"))
    elif "higher" in correct_answer.lower():
        options.append(correct_answer.replace("higher", "lower").replace("Higher", "Lower"))
    elif "greater" in correct_answer.lower():
        options.append(correct_answer.replace("greater", "less").replace("Greater", "Less"))
    elif "more" in correct_answer.lower():
        options.append(correct_answer.replace("more", "less").replace("More", "Less"))
    
    # Fill remaining slots
    while len(options) < 4:
        option = random.choice(generic_options)
        if option not in options and option != correct_answer:
            options.append(option)
    
    random.shuffle(options)
    return options[:4]

def convert_question(q):
    """Convert a single question to required format"""
    
    answer_hint = q.get("answerHint", "")
    correct_answer = extract_answer(answer_hint)
    
    is_numerical = is_numerical_answer(answer_hint)
    
    # For numerical answers, 50% MCQ, 50% numerical
    if is_numerical:
        use_mcq = random.random() < 0.5
        q_type = "multiple_choice" if use_mcq else "numerical"
    else:
        q_type = "multiple_choice"
    
    converted = {
        "id": q.get("id"),
        "chapter": q.get("chapter"),
        "category": q.get("category"),
        "difficulty": q.get("difficulty"),
        "question": q.get("question"),
        "tags": q.get("tags", []),
        "type": q_type,
        "correct_answer": correct_answer,
        "explanation": answer_hint if answer_hint else "Explanation to be added.",
        "estimated_time": estimate_time(q.get("difficulty", "Medium"))
    }
    
    # Add options if multiple choice
    if q_type == "multiple_choice":
        if is_numerical:
            converted["options"] = generate_numerical_options(correct_answer)
        else:
            converted["options"] = generate_conceptual_options(q.get("question", ""), correct_answer)
    
    return converted

def convert_database(input_file, output_file):
    """Convert entire database"""
    
    print(f"📖 Reading {input_file}...")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: Could not find {input_file}")
        print("Make sure the JSON file is in the same directory as this script.")
        return
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON format in {input_file}")
        print(f"   {e}")
        return
    
    questions = data.get("questions", [])
    print(f"✅ Found {len(questions)} questions")
    
    converted_questions = []
    for i, q in enumerate(questions):
        try:
            converted = convert_question(q)
            converted_questions.append(converted)
            if (i + 1) % 50 == 0:
                print(f"   Converted {i + 1}/{len(questions)} questions...")
        except Exception as e:
            print(f"⚠️  Warning: Error converting question {q.get('id', 'unknown')}: {e}")
    
    output = {
        "questions": converted_questions
    }
    
    print(f"\n💾 Writing {len(converted_questions)} converted questions to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Conversion complete! {len(converted_questions)} questions converted.")
    
    # Statistics
    type_counts = {}
    difficulty_counts = {}
    category_counts = {}
    
    for q in converted_questions:
        q_type = q.get("type")
        difficulty = q.get("difficulty")
        category = q.get("category")
        
        type_counts[q_type] = type_counts.get(q_type, 0) + 1
        difficulty_counts[difficulty] = difficulty_counts.get(difficulty, 0) + 1
        category_counts[category] = category_counts.get(category, 0) + 1
    
    print("\n📊 Statistics:")
    print(f"   Question Types: {type_counts}")
    print(f"   Difficulties: {difficulty_counts}")
    print(f"   Categories: {len(category_counts)} unique categories")
    print(f"\n✨ Output saved to: {output_file}")

if __name__ == "__main__":
    INPUT_FILE = "combined_quant_finance_db.json"
    OUTPUT_FILE = "converted_questions_db.json"
    
    print("🚀 QuantPrep Question Database Converter")
    print("=" * 50)
    
    convert_database(INPUT_FILE, OUTPUT_FILE)
    
    print("\n✅ Done! Next step:")
    print("   Run: node format_for_react.js")