import React, { useState, useEffect } from 'react';
import { Copy, Download, Code, FileText, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const QuickTypeClone = () => {
  const [jsonInput, setJsonInput] = useState(`{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "swimming", "coding"]
}`);
  
  const [selectedLanguage, setSelectedLanguage] = useState('typescript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [className, setClassName] = useState('MyData');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: 'typescript', name: 'TypeScript', ext: 'ts' },
    { id: 'javascript', name: 'JavaScript', ext: 'js' },
    { id: 'python', name: 'Python', ext: 'py' },
    { id: 'java', name: 'Java', ext: 'java' },
    { id: 'csharp', name: 'C#', ext: 'cs' },
    { id: 'cpp', name: 'C++', ext: 'cpp' },
    { id: 'go', name: 'Go', ext: 'go' },
    { id: 'swift', name: 'Swift', ext: 'swift' },
    { id: 'kotlin', name: 'Kotlin', ext: 'kt' },
    { id: 'rust', name: 'Rust', ext: 'rs' },
  ];

  const generateCode = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError('');
      
      switch (selectedLanguage) {
        case 'typescript':
          setGeneratedCode(generateTypeScript(parsedJson, className));
          break;
        case 'javascript':
          setGeneratedCode(generateJavaScript(parsedJson, className));
          break;
        case 'python':
          setGeneratedCode(generatePython(parsedJson, className));
          break;
        case 'java':
          setGeneratedCode(generateJava(parsedJson, className));
          break;
        case 'csharp':
          setGeneratedCode(generateCSharp(parsedJson, className));
          break;
        case 'cpp':
          setGeneratedCode(generateCpp(parsedJson, className));
          break;
        case 'go':
          setGeneratedCode(generateGo(parsedJson, className));
          break;
        case 'swift':
          setGeneratedCode(generateSwift(parsedJson, className));
          break;
        case 'kotlin':
          setGeneratedCode(generateKotlin(parsedJson, className));
          break;
        case 'rust':
          setGeneratedCode(generateRust(parsedJson, className));
          break;
        default:
          setGeneratedCode('Language not supported yet');
      }
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
      setGeneratedCode('');
    }
  };

  const generateTypeScript = (obj, name) => {
    const generateInterface = (obj, interfaceName) => {
      let code = `export interface ${interfaceName} {\n`;
      
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        let type;
        
        if (value === null) {
          type = 'null';
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            type = 'any[]';
          } else if (typeof value[0] === 'object' && value[0] !== null) {
            type = `${key.charAt(0).toUpperCase() + key.slice(1)}Item[]`;
          } else {
            type = `${typeof value[0]}[]`;
          }
        } else if (typeof value === 'object') {
          type = key.charAt(0).toUpperCase() + key.slice(1);
        } else {
          type = typeof value;
        }
        
        code += `  ${key}: ${type};\n`;
      });
      
      code += '}\n\n';
      return code;
    };

    let fullCode = generateInterface(obj, name);
    
    // Generate nested interfaces
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
        fullCode += generateInterface(value, nestedName);
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
        const itemName = `${key.charAt(0).toUpperCase() + key.slice(1)}Item`;
        fullCode += generateInterface(value[0], itemName);
      }
    });

    // Add conversion functions
    fullCode += `export const to${name} = (json: string): ${name} => {\n`;
    fullCode += `  return JSON.parse(json);\n`;
    fullCode += `};\n\n`;
    fullCode += `export const ${name.toLowerCase()}ToJson = (value: ${name}): string => {\n`;
    fullCode += `  return JSON.stringify(value);\n`;
    fullCode += `};`;

    return fullCode;
  };

  const generateJavaScript = (obj, name) => {
    let code = `class ${name} {\n`;
    code += `  constructor(data) {\n`;
    
    Object.keys(obj).forEach(key => {
      code += `    this.${key} = data.${key};\n`;
    });
    
    code += `  }\n\n`;
    code += `  static fromJSON(json) {\n`;
    code += `    return new ${name}(JSON.parse(json));\n`;
    code += `  }\n\n`;
    code += `  toJSON() {\n`;
    code += `    return JSON.stringify(this);\n`;
    code += `  }\n`;
    code += `}\n\n`;
    code += `module.exports = ${name};`;
    
    return code;
  };

  const generatePython = (obj, name) => {
    let code = `from dataclasses import dataclass\nfrom typing import List, Optional, Any\nimport json\n\n`;
    
    const generateClass = (obj, className) => {
      let classCode = `@dataclass\nclass ${className}:\n`;
      
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        let type_hint;
        
        if (value === null) {
          type_hint = 'Optional[Any]';
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            type_hint = 'List[Any]';
          } else if (typeof value[0] === 'string') {
            type_hint = 'List[str]';
          } else if (typeof value[0] === 'number') {
            type_hint = 'List[float]';
          } else if (typeof value[0] === 'boolean') {
            type_hint = 'List[bool]';
          } else {
            type_hint = 'List[Any]';
          }
        } else if (typeof value === 'string') {
          type_hint = 'str';
        } else if (typeof value === 'number') {
          type_hint = 'float';
        } else if (typeof value === 'boolean') {
          type_hint = 'bool';
        } else if (typeof value === 'object') {
          type_hint = key.charAt(0).toUpperCase() + key.slice(1);
        } else {
          type_hint = 'Any';
        }
        
        classCode += `    ${key}: ${type_hint}\n`;
      });
      
      classCode += `\n    @classmethod\n`;
      classCode += `    def from_json(cls, json_str: str) -> '${className}':\n`;
      classCode += `        data = json.loads(json_str)\n`;
      classCode += `        return cls(**data)\n\n`;
      classCode += `    def to_json(self) -> str:\n`;
      classCode += `        return json.dumps(self.__dict__)\n\n`;
      
      return classCode;
    };

    code += generateClass(obj, name);
    
    // Generate nested classes
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        code += generateClass(value, key.charAt(0).toUpperCase() + key.slice(1));
      }
    });

    return code;
  };

  const generateJava = (obj, name) => {
    let code = `import com.fasterxml.jackson.annotation.JsonProperty;\nimport com.fasterxml.jackson.databind.ObjectMapper;\nimport java.util.List;\n\n`;
    code += `public class ${name} {\n`;
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      let javaType;
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          javaType = 'List<Object>';
        } else if (typeof value[0] === 'string') {
          javaType = 'List<String>';
        } else if (typeof value[0] === 'number') {
          javaType = 'List<Double>';
        } else if (typeof value[0] === 'boolean') {
          javaType = 'List<Boolean>';
        } else {
          javaType = 'List<Object>';
        }
      } else if (typeof value === 'string') {
        javaType = 'String';
      } else if (typeof value === 'number') {
        javaType = 'double';
      } else if (typeof value === 'boolean') {
        javaType = 'boolean';
      } else if (typeof value === 'object' && value !== null) {
        javaType = key.charAt(0).toUpperCase() + key.slice(1);
      } else {
        javaType = 'Object';
      }
      
      code += `    @JsonProperty("${key}")\n`;
      code += `    private ${javaType} ${key};\n\n`;
    });

    // Getters and setters
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      let javaType = typeof value === 'string' ? 'String' : 
                    typeof value === 'number' ? 'double' :
                    typeof value === 'boolean' ? 'boolean' : 'Object';
      
      if (Array.isArray(value)) {
        javaType = 'List<Object>';
      } else if (typeof value === 'object' && value !== null) {
        javaType = key.charAt(0).toUpperCase() + key.slice(1);
      }
      
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      code += `    public ${javaType} get${capitalizedKey}() {\n`;
      code += `        return ${key};\n`;
      code += `    }\n\n`;
      code += `    public void set${capitalizedKey}(${javaType} ${key}) {\n`;
      code += `        this.${key} = ${key};\n`;
      code += `    }\n\n`;
    });

    code += `    public static ${name} fromJson(String json) throws Exception {\n`;
    code += `        ObjectMapper mapper = new ObjectMapper();\n`;
    code += `        return mapper.readValue(json, ${name}.class);\n`;
    code += `    }\n\n`;
    code += `    public String toJson() throws Exception {\n`;
    code += `        ObjectMapper mapper = new ObjectMapper();\n`;
    code += `        return mapper.writeValueAsString(this);\n`;
    code += `    }\n`;
    code += `}`;

    return code;
  };

  const generateCSharp = (obj, name) => {
    let code = `using System;\nusing System.Collections.Generic;\nusing Newtonsoft.Json;\n\n`;
    code += `public class ${name}\n{\n`;
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      let csharpType;
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          csharpType = 'List<object>';
        } else if (typeof value[0] === 'string') {
          csharpType = 'List<string>';
        } else if (typeof value[0] === 'number') {
          csharpType = 'List<double>';
        } else if (typeof value[0] === 'boolean') {
          csharpType = 'List<bool>';
        } else {
          csharpType = 'List<object>';
        }
      } else if (typeof value === 'string') {
        csharpType = 'string';
      } else if (typeof value === 'number') {
        csharpType = 'double';
      } else if (typeof value === 'boolean') {
        csharpType = 'bool';
      } else if (typeof value === 'object' && value !== null) {
        csharpType = key.charAt(0).toUpperCase() + key.slice(1);
      } else {
        csharpType = 'object';
      }
      
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      code += `    [JsonProperty("${key}")]\n`;
      code += `    public ${csharpType} ${capitalizedKey} { get; set; }\n\n`;
    });

    code += `    public static ${name} FromJson(string json)\n`;
    code += `    {\n`;
    code += `        return JsonConvert.DeserializeObject<${name}>(json);\n`;
    code += `    }\n\n`;
    code += `    public string ToJson()\n`;
    code += `    {\n`;
    code += `        return JsonConvert.SerializeObject(this);\n`;
    code += `    }\n`;
    code += `}`;

    return code;
  };

  const generateCpp = (obj, name) => {
    let code = `#include <string>\n#include <vector>\n#include <nlohmann/json.hpp>\n\nusing json = nlohmann::json;\n\n`;
    code += `class ${name} {\npublic:\n`;
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      let cppType;
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          cppType = 'std::vector<json>';
        } else if (typeof value[0] === 'string') {
          cppType = 'std::vector<std::string>';
        } else if (typeof value[0] === 'number') {
          cppType = 'std::vector<double>';
        } else if (typeof value[0] === 'boolean') {
          cppType = 'std::vector<bool>';
        } else {
          cppType = 'std::vector<json>';
        }
      } else if (typeof value === 'string') {
        cppType = 'std::string';
      } else if (typeof value === 'number') {
        cppType = 'double';
      } else if (typeof value === 'boolean') {
        cppType = 'bool';
      } else {
        cppType = 'json';
      }
      
      code += `    ${cppType} ${key};\n`;
    });

    code += `\n    static ${name} from_json(const std::string& json_str) {\n`;
    code += `        json j = json::parse(json_str);\n`;
    code += `        ${name} obj;\n`;
    
    Object.keys(obj).forEach(key => {
      code += `        obj.${key} = j["${key}"];\n`;
    });
    
    code += `        return obj;\n`;
    code += `    }\n\n`;
    code += `    std::string to_json() const {\n`;
    code += `        json j;\n`;
    
    Object.keys(obj).forEach(key => {
      code += `        j["${key}"] = ${key};\n`;
    });
    
    code += `        return j.dump();\n`;
    code += `    }\n`;
    code += `};`;

    return code;
  };

  const generateGo = (obj, name) => {
    let code = `package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\n`;
    code += `type ${name} struct {\n`;
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      let goType;
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          goType = '[]interface{}';
        } else if (typeof value[0] === 'string') {
          goType = '[]string';
        } else if (typeof value[0] === 'number') {
          goType = '[]float64';
        } else if (typeof value[0] === 'boolean') {
          goType = '[]bool';
        } else {
          goType = '[]interface{}';
        }
      } else if (typeof value === 'string') {
        goType = 'string';
      } else if (typeof value === 'number') {
        goType = 'float64';
      } else if (typeof value === 'boolean') {
        goType = 'bool';
      } else {
        goType = 'interface{}';
      }
      
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      code += `    ${capitalizedKey} ${goType} \`json:"${key}"\`\n`;
    });

    code += `}\n\n`;
    code += `func (m *${name}) FromJSON(data []byte) error {\n`;
    code += `    return json.Unmarshal(data, m)\n`;
    code += `}\n\n`;
    code += `func (m *${name}) ToJSON() ([]byte, error) {\n`;
    code += `    return json.Marshal(m)\n`;
    code += `}`;

    return code;
  };

  const generateSwift = (obj, name) => {
    let code = `import Foundation\n\nstruct ${name}: Codable {\n`;
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      let swiftType;
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          swiftType = '[Any]';
        } else if (typeof value[0] === 'string') {
          swiftType = '[String]';
        } else if (typeof value[0] === 'number') {
          swiftType = '[Double]';
        } else if (typeof value[0] === 'boolean') {
          swiftType = '[Bool]';
        } else {
          swiftType = '[Any]';
        }
      } else if (typeof value === 'string') {
        swiftType = 'String';
      } else if (typeof value === 'number') {
        swiftType = 'Double';
      } else if (typeof value === 'boolean') {
        swiftType = 'Bool';
      } else {
        swiftType = 'Any';
      }
      
      code += `    let ${key}: ${swiftType}\n`;
    });

    code += `}\n\n`;
    code += `extension ${name} {\n`;
    code += `    static func from(json: Data) throws -> ${name} {\n`;
    code += `        return try JSONDecoder().decode(${name}.self, from: json)\n`;
    code += `    }\n\n`;
    code += `    func toJSON() throws -> Data {\n`;
    code += `        return try JSONEncoder().encode(self)\n`;
    code += `    }\n`;
    code += `}`;

    return code;
  };

  const generateKotlin = (obj, name) => {
    let code = `import kotlinx.serialization.Serializable\nimport kotlinx.serialization.json.Json\n\n`;
    code += `@Serializable\ndata class ${name}(\n`;
    
    const keys = Object.keys(obj);
    keys.forEach((key, index) => {
      const value = obj[key];
      let kotlinType;
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          kotlinType = 'List<Any>';
        } else if (typeof value[0] === 'string') {
          kotlinType = 'List<String>';
        } else if (typeof value[0] === 'number') {
          kotlinType = 'List<Double>';
        } else if (typeof value[0] === 'boolean') {
          kotlinType = 'List<Boolean>';
        } else {
          kotlinType = 'List<Any>';
        }
      } else if (typeof value === 'string') {
        kotlinType = 'String';
      } else if (typeof value === 'number') {
        kotlinType = 'Double';
      } else if (typeof value === 'boolean') {
        kotlinType = 'Boolean';
      } else {
        kotlinType = 'Any';
      }
      
      code += `    val ${key}: ${kotlinType}${index < keys.length - 1 ? ',' : ''}\n`;
    });

    code += `) {\n`;
    code += `    companion object {\n`;
    code += `        fun fromJson(json: String): ${name} {\n`;
    code += `            return Json.decodeFromString(json)\n`;
    code += `        }\n`;
    code += `    }\n\n`;
    code += `    fun toJson(): String {\n`;
    code += `        return Json.encodeToString(this)\n`;
    code += `    }\n`;
    code += `}`;

    return code;
  };

  const generateRust = (obj, name) => {
    let code = `use serde::{Deserialize, Serialize};\n\n`;
    code += `#[derive(Serialize, Deserialize, Debug)]\npub struct ${name} {\n`;
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      let rustType;
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          rustType = 'Vec<serde_json::Value>';
        } else if (typeof value[0] === 'string') {
          rustType = 'Vec<String>';
        } else if (typeof value[0] === 'number') {
          rustType = 'Vec<f64>';
        } else if (typeof value[0] === 'boolean') {
          rustType = 'Vec<bool>';
        } else {
          rustType = 'Vec<serde_json::Value>';
        }
      } else if (typeof value === 'string') {
        rustType = 'String';
      } else if (typeof value === 'number') {
        rustType = 'f64';
      } else if (typeof value === 'boolean') {
        rustType = 'bool';
      } else {
        rustType = 'serde_json::Value';
      }
      
      code += `    pub ${key}: ${rustType},\n`;
    });

    code += `}\n\n`;
    code += `impl ${name} {\n`;
    code += `    pub fn from_json(json: &str) -> Result<Self, serde_json::Error> {\n`;
    code += `        serde_json::from_str(json)\n`;
    code += `    }\n\n`;
    code += `    pub fn to_json(&self) -> Result<String, serde_json::Error> {\n`;
    code += `        serde_json::to_string(self)\n`;
    code += `    }\n`;
    code += `}`;

    return code;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadCode = () => {
    const language = languages.find(lang => lang.id === selectedLanguage);
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${className.toLowerCase()}.${language?.ext || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    generateCode();
  }, [jsonInput, selectedLanguage, className]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              QuickType Clone
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Generate strongly-typed models and serializers from JSON in multiple programming languages
          </p>
        </div>

        {/* Configuration */}
        <div className="mb-8 flex flex-wrap gap-6 justify-center items-center">
          <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-xl px-4 py-3 shadow-lg">
            <label className="text-gray-300 font-medium">Class Name:</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              placeholder="MyData"
            />
          </div>
          <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-xl px-4 py-3 shadow-lg">
            <label className="text-gray-300 font-medium">Language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* JSON Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">JSON Input</h2>
              {error && (
                <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-1">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm">Invalid JSON</span>
                </div>
              )}
            </div>
            <div className="relative group">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-96 p-4 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl text-gray-100 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 group-hover:border-slate-500/70 shadow-xl"
                placeholder="Enter your JSON here..."
                spellCheck={false}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            </div>
            </div>

          {/* Generated Code Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Generated Code</h2>
                {generatedCode && (
                  <div className="flex items-center gap-1 bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Ready</span>
                  </div>
                )}
              </div>
              
              {generatedCode && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 hover:bg-purple-600 border border-purple-500/50 rounded-lg text-white transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadCode}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 rounded-lg text-white transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <pre className="w-full h-96 p-4 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl text-gray-100 font-mono text-sm overflow-auto shadow-xl group-hover:border-slate-500/70 transition-all duration-300">
                <code className="language-typescript">
                  {generatedCode || 'Generated code will appear here...'}
                </code>
              </pre>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/40 backdrop-blur-md border border-slate-600/30 rounded-full text-gray-400 shadow-lg">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Instantly generate type-safe code from JSON</span>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QuickTypeClone;
