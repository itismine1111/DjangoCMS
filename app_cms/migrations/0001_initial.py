# Generated by Django 4.1.5 on 2023-01-20 09:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="LinkType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "linkType",
                    models.CharField(max_length=100, verbose_name="Link Type"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="LinkInfo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        blank=True, max_length=100, null=True, verbose_name="Name"
                    ),
                ),
                (
                    "url",
                    models.URLField(blank=True, null=True, verbose_name="Link Url"),
                ),
                (
                    "title",
                    models.CharField(
                        blank=True, max_length=50, null=True, verbose_name="Title "
                    ),
                ),
                (
                    "isEnabled",
                    models.BooleanField(default=True, verbose_name="Is Enabled"),
                ),
                ("content", models.TextField(blank=True, verbose_name="Content")),
                (
                    "useExternalUrl",
                    models.BooleanField(default=False, verbose_name="Use External Url"),
                ),
                (
                    "externalUrl",
                    models.URLField(blank=True, null=True, verbose_name="External Url"),
                ),
                (
                    "openInExternalWindow",
                    models.BooleanField(default=False, verbose_name="Use External Url"),
                ),
                ("sortOrderId", models.IntegerField(verbose_name="Sort Order Id")),
                (
                    "linkTypeId",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="app_cms.linktype",
                    ),
                ),
                (
                    "parentId",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="linkInfoParent",
                        to="app_cms.linkinfo",
                    ),
                ),
            ],
        ),
    ]
