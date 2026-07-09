import re
import json
from typing import List, Dict, Any

class MateriaMedicaParser:
    """
    Parses raw classical texts (e.g., Boericke) into structured data.
    """
    def __init__(self):
        self.remedy_pattern = re.compile(r'^([A-Z\s]+)\n-{3,}', re.MULTILINE)
        
    def extract_remedies(self, raw_text: str) -> List[Dict[str, Any]]:
        """Mock extraction of remedies from plain text."""
        remedies = []
        # In a real scenario, this would use complex regex or NLP to split texts
        # For Day 5, we simulate parsing raw text chunks
        segments = raw_text.split("\n\n")
        current_remedy = None
        
        for segment in segments:
            if segment.isupper():
                current_remedy = {"remedy_name": segment.strip(), "symptoms": []}
                remedies.append(current_remedy)
            elif current_remedy:
                current_remedy["symptoms"].append(segment.strip())
                
        return remedies

class HierarchicalTagger:
    """
    Tags parsed text hierarchically: Remedy -> Organ System -> Rubric -> Modality.
    """
    def __init__(self):
        self.organ_systems = ["Mind", "Head", "Eyes", "Ears", "Stomach", "Abdomen", "Respiratory", "Skin"]
        
    def tag_symptom(self, symptom_text: str) -> Dict[str, Any]:
        """Classify symptom into a hierarchy using heuristic/mock logic."""
        tags = {
            "organ_system": "General",
            "modality_worse": [],
            "modality_better": []
        }
        
        # Determine Organ System
        for organ in self.organ_systems:
            if organ.lower() in symptom_text.lower():
                tags["organ_system"] = organ
                break
                
        # Determine Modalities (worse = '<', better = '>')
        if "worse" in symptom_text.lower() or "<" in symptom_text:
            tags["modality_worse"].append(symptom_text)
            
        if "better" in symptom_text.lower() or ">" in symptom_text:
            tags["modality_better"].append(symptom_text)
            
        return {"text": symptom_text, "tags": tags}

def process_pipeline(raw_text: str):
    """Executes the full parsing and tagging pipeline."""
    parser = MateriaMedicaParser()
    tagger = HierarchicalTagger()
    
    parsed_data = parser.extract_remedies(raw_text)
    
    enriched_data = []
    for remedy in parsed_data:
        tagged_symptoms = [tagger.tag_symptom(sym) for sym in remedy["symptoms"]]
        enriched_data.append({
            "remedy_name": remedy["remedy_name"],
            "structured_symptoms": tagged_symptoms
        })
        
    return enriched_data

# Example usage trigger
if __name__ == "__main__":
    sample_text = "BELLADONNA\n\nHead throbbing worse from light\n\nStomach painful better by pressure"
    print(json.dumps(process_pipeline(sample_text), indent=2))
