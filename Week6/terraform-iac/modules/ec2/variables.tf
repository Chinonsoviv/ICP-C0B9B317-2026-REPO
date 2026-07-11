variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "subnet_id" {
  description = "ID of the subnet to launch instance in"
  type        = string
}

variable "security_group_id" {
  description = "ID of the security group"
  type        = string
}